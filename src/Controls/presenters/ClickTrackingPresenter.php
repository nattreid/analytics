<?php

declare(strict_types = 1);

namespace NAttreid\Analytics\Presenters;

use NAttreid\Form\Form;
use NAttreid\Tracking\Tracking;
use NAttreid\Utils\Range;

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

	protected function createComponentSearchForm()
	{
		$form = $this->formFactory->create();
		$form->setAjaxRequest();

		$form->addDateRange('interval', 'analytics.interval')
			->setDefaultValue(new Range((new \DateTime)->modify('-30 days'), new \DateTime));

		$form->addSelectUntranslated('group', 'analytics.tracking.clickGroup', $this->tracking->fetchGroupPairs())
			->setPrompt($this->translate('form.none'));

		$form->onSuccess[] = function (Form $form, $values) {
			if (!empty($values->group)) {
				$this->view = true;
			}
			$this->redrawControl('stats');
		};

		return $form;
	}

	public function renderDefault()
	{
		$form = $this['searchForm'];
		$interval = $form['interval']->getValue();
		$group = $form['group']->getValue();

		if ($this->view) {
			$clicksByDay = $this->tracking->findClicksByDay($group, $interval);
			$clicks = $sum = $avg = [];
			foreach ($clicksByDay as $row) {
				$clicks[] = '{"x":' . ((strtotime($row->date) + 1) * 1000) . ', "y": ' . $row->num . '}';
				$sum[] = '{"x":' . ((strtotime($row->date) + 1) * 1000) . ', "y": ' . ($row->sum ?: 0) . '}';
				$avg[] = '{"x":' . ((strtotime($row->date) + 1) * 1000) . ', "y": ' . ($row->avg ?: 0) . '}';
			}
			$this->template->clicks = '[' . implode(',', $clicks) . ']';
			$this->template->sum = '[' . implode(',', $sum) . ']';
			$this->template->avg = '[' . implode(',', $avg) . ']';
		}
		$this->template->view = $this->view;
	}

}
