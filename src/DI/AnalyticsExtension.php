<?php

declare(strict_types=1);

namespace NAttreid\Analytics\DI;

use NAttreid\Cms\DI\ModuleExtension;

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

	public function beforeCompile(): void
	{
		parent::beforeCompile();
		$this->addLoaderFile(__DIR__ . '/../../assets/analytics.min.css');
		$this->addLoaderFile(__DIR__ . '/../../assets/analytics.boundled.min.js');
	}

}
