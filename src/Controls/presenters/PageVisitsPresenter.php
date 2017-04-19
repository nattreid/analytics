<?php

declare(strict_types=1);

namespace NAttreid\Analytics\Presenters;

use NAttreid\Form\Form;
use NAttreid\Tracking\Tracking;
use NAttreid\Utils\Range;
use NAttreid\VisualPaginator\VisualPaginator;

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

	protected function createComponentSearchForm(): Form
	{
		$form = $this->formFactory->create();
		$form->setAjaxRequest();

		$form->addDateRange('interval', 'analytics.interval');

		$form->onSuccess[] = [$this, 'searchFormSucceeded'];

		return $form;
	}

	public function searchFormSucceeded(Form $form, $values)
	{
		$this->interval = (string) $values->interval;
		$this->redrawControl('stats');
	}

	protected function createComponentPaginator(): VisualPaginator
	{
		$control = new VisualPaginator(50);
		$control->setAjaxRequest();
		$control->setNoAjaxHistory();
		$control->onClick[] = function () {
			$this->redrawControl('stats');
		};
		return $control;
	}

	public function renderDefault(): void
	{
		if ($this->interval !== null) {
			$visitsPages = $this->tracking->findPages(Range::createFromString($this->interval));
			$this['paginator']->setPagination($visitsPages);
			$this->template->visitsPages = $visitsPages;
		}
	}

}
