<?php

namespace NAttreid\Analytics\DI;
use NAttreid\Crm\DI\ModuleExtension;

/**
 * Rozsireni
 *
 * @author Attreid <attreid@gmail.com>
 */
class AnalyticsExtension extends ModuleExtension
{

	protected $namespace = 'analytics';
	protected $dir = __DIR__;
	protected $package = 'NAttreid\\';

	public function beforeCompile()
	{
		parent::beforeCompile();
		$this->addLoaderFile(__DIR__ . '/../../assets/analytics.min.css');
		$this->addLoaderFile(__DIR__ . '/../../assets/analytics.boundled.min.js');
	}

}
