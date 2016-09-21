<?php

namespace NAttreid\Analytics\Presenters;
use NAttreid\Crm\Control\ExtensionPresenter;
use NAttreid\VPaginator\PaginatorTrait;

/**
 * Zakladni presenter pro Analytics presentery
 *
 * @author Attreid <attreid@gmail.com>
 */
abstract class BasePresenter extends ExtensionPresenter
{

	use PaginatorTrait;
}
