<?php

declare(strict_types=1);

namespace NAttreid\Analytics\Presenters;

use NAttreid\Form\Form;
use NAttreid\Tracking\Tracking;
use NAttreid\Utils\Range;
use Nette\Utils\ArrayHash;

/**
 * Kliky
 *
 * @author Attreid <attreid@gmail.com>
 */
class ClickTrackingPresenter extends BasePresenter
{

	/** @var Tracking */
	private $tracking;

	/** @var bool */
	private $view = false;

	public function __construct(Tracking $tracking)
	{
		parent::__construct();
		$this->tracking = $tracking;
	}

	protected function createComponentSearchForm(): Form
	{
		$form = $this->formFactory->create();
		$form->setAjaxRequest();

		$form->addDateRange('interval', 'analytics.interval')
			->setDefaultValue(new Range((new \DateTime)->modify('-30 days'), new \DateTime));

		$form->addSelectUntranslated('group', 'analytics.tracking.clickGroup', $this->tracking->fetchGroupPairs())
			->setPrompt($this->translate('form.none'));

		$form->onSuccess[] = [$this, 'searchFormSucceeded'];

		return $form;
	}

	public function searchFormSucceeded(Form $form, ArrayHash $values): void
	{
		if (!empty($values->group)) {
			$this->view = true;
		}
		$this->redrawControl('stats');
	}

	public function renderDefault(): void
	{
		$form = $this['searchForm'];
		$groupId = $form['group']->getValue();
		$interval = $form['interval']->getValue();

		if ($this->view) {
			$this->clickByDay($groupId, $interval);
			$this->clickByValue($groupId, $interval);
		}
		$this->template->view = $this->view;
	}

	private function clickByDay(int $groupId, Range $interval)
	{
		$clicksByDay = $this->tracking->findClicksByDay($groupId, $interval);
		$clicks = $sum = $avg = [];
		foreach ($clicksByDay as $row) {
			$clicks[] = '{"x":' . ((strtotime((string) $row->date) + 1) * 1000) . ', "y": ' . $row->num . '}';
			$sum[] = '{"x":' . ((strtotime((string) $row->date) + 1) * 1000) . ', "y": ' . ($row->sum ?: 0) . '}';
			$avg[] = '{"x":' . ((strtotime((string) $row->date) + 1) * 1000) . ', "y": ' . ($row->avg ?: 0) . '}';
		}
		$this->template->clicks = '[' . implode(',', $clicks) . ']';
		$this->template->sum = '[' . implode(',', $sum) . ']';
		$this->template->avg = '[' . implode(',', $avg) . ']';
	}


	private function clickByValue(int $groupId, Range $interval)
	{
		$clicksByValue = $this->tracking->findClicksValue($groupId, $interval);
		$values = $labels = [];
		foreach ($clicksByValue as $row) {
			$labels[] = "\"$row->value\"";
			$values[] = $row->num;
		}
		$this->template->labels = '[' . implode(',', $labels) . ']';
		$this->template->values = '[' . implode(',', $values) . ']';
	}
}
