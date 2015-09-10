<div class="grid_15 prefix_1 suffix_1 alpha omega" id="properties">

  <nav class="view-options clearfix">
    <?=anchor(current_url() . '?v=map#properties', 'Kartenansicht', array('class' => 'map-view' . ($view_type=='map' ? ' selected' : ''))); ?>
    <?=anchor(current_url() . '?v=list#properties', 'Listenansicht', array('class' => 'list-view' . ($view_type=='list' ? ' selected' : ''))); ?>
    <?=anchor(current_url() . '?v=photo#properties', 'Fotoansicht', array('class' => 'photo-view' . ($view_type=='photo' ? ' selected' : ''))); ?>
  </nav>

  <?=$this->load->view('properties/_' . $view_type . '_view', array('properties'=>$properties));?>

</div>
