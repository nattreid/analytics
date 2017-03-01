<?php

declare(strict_types = 1);

namespace NAttreid\Analytics\Presenters;

use NAttreid\Tracking\Tracking;
use NAttreid\Utils\Range;

/**
 * Navstevy
 *
 * @author Attreid <attreid@gmail.com>
 */
class VisitsPresenter extends BasePresenter
{

	/** @var Tracking */
	private $tracking;

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

		$form->onSuccess[] = function () {
			$this->redrawControl('stats');
		};

		return $form;
	}

	public function renderDefault()
	{
		$form = $this['searchForm'];
		$interval = $form['interval']->getValue();

		$visitsByDay = $this->tracking->findVisitsDays($interval);
		$arr = [];
		foreach ($visitsByDay as $row) {
			$datefield = ((strtotime($row->datefield) + 1) * 1000);
			$arr[] = "{\"x\": $datefield, \"y\": $row->visits}";
		}
		$this->template->visitsByDay = '[' . implode(',', $arr) . ']';

		$visitsByHour = $this->tracking->findVisitsHours($interval);

		$arr = [];
		for ($i = 0; $i < 24; $i++) {
			$arr[$i] = 0;
		}
		foreach ($visitsByHour as $row) {
			$arr[$row->hour] = $row->visits;
		}
		$this->template->visitsByHour = '[' . implode(',', $arr) . ']';
	}

}
