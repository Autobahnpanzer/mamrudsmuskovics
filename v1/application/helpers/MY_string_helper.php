<?php

if( ! function_exists('pluralize'))
{	
	/**
	* pluralize
	* 
	*/
	function pluralize($number, $singular, $plural) {
		if($number == 1) {
			$r = $singular;
		} else {
			$r = $plural;
		}
		return $number . ' ' . $r;
	}
}

if( ! function_exists('improve_type'))
{	
	/**
	* formats string
	* @param string $str
	*/    
    function improve_type($str) {
    	$str = trim($str);
    	$str = str_replace("/", "&#8239;/&#8201;", $str);
    	$str = preg_replace('/([ ]{1,})([0-9]{1,4})/', '&nbsp;$2', $str);
    	return $str;
    }
}

// format the date to human readable date
//TODO: move to a more appropriate helper
if ( ! function_exists('date_formatter')) {

	function date_formatter($data, $format = 'date') {
		
		$formats = array(	'date' => 'j.n.Y',
							'hour' => 'G',
							'date_time' => 'd.m.Y H:i',
							'time' => 'H:i',
						 	'time_long' => 'H:i:s',
						 	'short_date' => 'j.n.'					
						);
		
		if( ! array_key_exists($format, $formats))
			return '';
		
		if( ! is_array($data))
			return date($formats[$format], strtotime($data));
		
		if(empty($data[1]))
			return date($formats[$format], strtotime($data[0]));

		$date_from = date($formats[$format], strtotime($data[0]));
		$date_to = date($formats[$format], strtotime($data[1]));

		if($date_from != $date_to)
			return $date_from . '–' . $date_to;
		
		if(!in_array($format, array('date', 'short_date')))
			return $date_from;
			
		return $date_from . ' &middot; ' . date($formats['time'], strtotime($data[0])) . '–' . date($formats['time'], strtotime($data[1]));
		
	}
}
