<?

if( ! function_exists('simple_format'))
{	
	/**
	* formats string
	* @param string $str
	*/    
    function simple_format($str)
    {
    	$start_tag = "<p>";
    	
    	$str = preg_replace("/\r\n?/", "\n", $str);                    	# \r\n and \r -> \n
  		$str = preg_replace("/\n\n+/", "</p>\n\n{$start_tag}", $str);  	# 2+ newline  -> paragraph
		
    	return preg_replace('#<p>[\n\r\s]*?</p>#m', '', '<p>'.preg_replace('#(<br\s*?/?>){2,}#m', '</p><p>', trim($str)).'</p>');	
    }
}

if ( ! function_exists('highlight_query')) {

	function highlight_query($query, $text) {
		
		$patterns = Array();
		$replaces = Array();
		
		if ($query != "") {  
			$words=explode(" ", $query);
			foreach($words as $word){
				$patterns[]='/'.$word.'/i';
				$replaces[]='<i>$0</i>';
			}
			return preg_replace($patterns, $replaces, $text); 
		} else return $text;

	}

}
