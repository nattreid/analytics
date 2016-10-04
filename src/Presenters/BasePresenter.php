<?php

namespace NAttreid\Analytics\Presenters;

use NAttreid\Crm\Control\ModulePresenter;
use NAttreid\VPaginator\PaginatorTrait;

/**
 * Zakladni presenter pro Analytics presentery
 *
 * @author Attreid <attreid@gmail.com>
 */
abstract class BasePresenter extends ModulePresenter
{

	use PaginatorTrait;
}
