<div class="  clearfix" id="main">
  <section class="grid_17 prefix_7">
    <p class="boxed txt intro">
      DVI versteht sich als agiles und entschlossenes Un&shy;ternehmen für Immo&shy;bi&shy;lien&shy;in&shy;ves&shy;ti&shy;tionen aller Art. Die im Jahr 2000 gegründete Un&shy;ter&shy;neh&shy;mens&shy;grup&shy;pe umfasst der&shy;zeit einen Eigenbestand von rund 450.000 m² vermietbarer Fläche im Wohn- und Ge&shy;wer&shy;be&shy;bereich und verteilt sich auf 6.000 Miet&shy;par&shy;teien.
      <?=anchor('/ueber-uns', 'Mehr&nbsp;&rarr;', array('class' => 'more'));?>
    </p>
    <?=$this->load->view('properties/_properties', array('properties' => $properties, 'view_type' => $view_type));?>
  </section>
</div>
