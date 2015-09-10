<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class contact extends MY_Controller {

  function __construct() {
    parent::__construct();
    $this->load->library('form_validation');
    $this->load->library('email');
  }

  // --------------------------------------------------------------------

  public function index() {

    $data = array();

    $this->load->helper('form');

    $data['mail_sent'] = false;

    if($this->input->post()) {

      $msg = $this->input->post('text');

      if($this->input->post('sender_phone') != '')
        $msg .= "\r\nTelefon: " . $this->input->post('sender_phone');

      $data['mail_sent'] = $this->send(array(
                  'sender_mail' => $this->input->post('sender_mail'),
                  'sender_name' => $this->input->post('sender_name'),
                  'recipient_mail' => $this->config->config['App']['mailto'],
                  'subject' => 'Kontaktformular ' . base_url(),
                  'message' => $msg
                  ));
    }

    $this->page['page_title'] = 'Kontaktformular - DVI Gruppe';

    $content = $this->load->view('contact/_index', $data, TRUE, TRUE);

    $this->render($content);
  }

  private function send($mail) {

    $this->form_validation->set_rules('sender_mail', 'E-Mail', 'trim|required|valid_email');
    $this->form_validation->set_rules('sender_name', 'Name', 'trim|required');

    if ($this->form_validation->run() == FALSE)
      return false;

    $this->email->from($mail['sender_mail'], $mail['sender_name']);
    $this->email->to($mail['recipient_mail']);

    $this->email->subject($mail['subject']);
    $this->email->message($mail['message']);

    $this->email->send();

    if('development' == ENVIRONMENT)
      log_message('debug', $this->email->print_debugger());

    return true;
  }
}

?>
