<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
|--------------------------------------------------------------------------
| Config for Google Maps Library
|--------------------------------------------------------------------------
|
*/

$config['Maps']['enableStamenMap'] = FALSE;
$config['Maps']['stamenMapType'] = 'toner-lite';

$config['Maps']['disableMapTypeControl'] = TRUE;
$config['Maps']['disableDefaultUI'] = TRUE;
$config['Maps']['disableDoubleClickZoom'] = TRUE;
$config['Maps']['draggable'] = FALSE;
//$config['Maps']['minifyJS'] = TRUE;

if(!$config['Maps']['enableStamenMap']) {
	$config['Maps']['stamenMapStyles'] = array(
		array("name"=>"MSG", "definition"=>array(
			array("featureType"=>"all", "stylers"=>array(array("lightness"=>"-10", "visibility"=>"simplified"))),
			array("featureType"=>"road", "elementType"=>"all", "stylers"=>array(array("lightness"=>"10", "visibility"=>"simplified"))),
			array("featureType"=>"landscape.natural", "elementType"=>"all", "stylers"=>array(array("lightness"=>"-60"))),
			array("featureType"=>"landscape.man_made", "elementType"=>"all", "stylers"=>array(array("lightness"=>"20"))),
			array("featureType"=>"water", "elementType"=>"all", "stylers"=>array(array("lightness"=>"-60"))),
			array("featureType"=>"transit", "elementType"=>"all", "stylers"=>array(array("lightness"=>"10"))),
			array("featureType"=>"administrative", "elementType"=>"all", "stylers"=>array(array("visibility"=>"simplified","lightness"=>"-20"))),
			array("featureType"=>"poi", "elementType"=>"all", "stylers"=>array(array("visibility"=>"off")))
		))
	);
}


/* End of file maps.php */
/* Location: ./application/config/maps.php */
