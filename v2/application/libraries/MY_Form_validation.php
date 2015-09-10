<?php 

class MY_Form_validation extends CI_Form_validation {

    public function __construct()
    {
        parent::__construct();

        $this->_error_prefix = '<p class="alert alert-error">';
        $this->_error_suffix = '</p>';
    }
}
