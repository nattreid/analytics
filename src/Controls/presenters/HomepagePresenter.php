<?php

declare(strict_types = 1);

namespace NAttreid\Analytics\Presenters;

/**
 * Domovska stranka statistik
 *
 * @author Attreid <attreid@gmail.com>
 */
class HomepagePresenter extends BasePresenter
{

	public function actionDefault()
	{
		$this->viewMobileMenu();
	}

}
