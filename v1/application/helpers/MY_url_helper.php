<?php

/**
 * absolute path
 *
 * Returns the "absolute path" item from your config file
 *
 * @access  public
 * @return  string
 */
if ( ! function_exists('absolute_path'))
{
  function absolute_path()
  {
    $CI =& get_instance();
    if(@$CI->config->slash_item('absolute_path'))
      return $CI->config->slash_item('absolute_path');
    else
      return false;
  }
}


if ( ! function_exists('download_url')) {
  function download_url($file_name) {
    return base_url('assets/downloads/'.$file_name);
  }
}


if ( ! function_exists('asset_url')) {
  function asset_url($file_name) {
    return base_url('assets/db/'.$file_name);
  }
}

if ( ! function_exists('sanitize_uri_chars')) {
  /**
   * Create URL Route
   *
   * Takes a "name" string as input and creates a
   * human-friendly URL string with an underscore as the word separator.
   *
   * @access   public
   * @param    string a name string
   * @return   string
   */
  function sanitize_uri_chars($string) {

    /*
        $return = convert_accented_characters($string);

    $trans = array(
      '/\s+/'         => '_',
      '/[^a-zA-Z0-9_-]/' => ''
    );
        return strtolower(preg_replace(array_keys($trans), array_values($trans), $return));
        */

        return url_title($string, '_', TRUE); // url_helper
  }
}

?>
