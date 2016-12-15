<?php

namespace NAttreid\Analytics\Presenters;

use NAttreid\Form\Form;
use NAttreid\Tracking\Tracking;
use NAttreid\Utils\Range;
use NAttreid\VPaginator\VPaginator;

/**
 * Navstevy stranek
 *
 * @author Attreid <attreid@gmail.com>
 */
class PageVisitsPresenter extends BasePresenter
{

	/** @var Tracking */
	private $tracking;

	public function __construct(Tracking $tracking)
	{
		parent::__construct();
		$this->tracking = $tracking;
	}

	/** @persistent */
	public $interval;

	protected function createComponentSearchForm()
	{
		$form = $this->formFactory->create();
		$form->setAjaxRequest();

		$form->addDateRange('interval', 'analytics.interval');

		$form->onSuccess[] = function (Form $form, $values) {
			$this->interval = (string)$values->interval;
			$this->redrawControl('stats');
		};

		return $form;
	}

	protected function createComponentPaginator()
	{
		$control = new VPaginator(50);
		$control->setAjaxRequest();
		$control->setNoAjaxHistory();
		$control->onClick[] = function () {
			$this->redrawControl('stats');
		};
		return $control;
	}

	public function renderDefault()
	{
		if ($this->interval !== null) {
			$visitsPages = $this->tracking->findPages(Range::createFromString($this->interval));
			$this['paginator']->setPagination($visitsPages);
			$this->template->visitsPages = $visitsPages;
		}
	}

}
