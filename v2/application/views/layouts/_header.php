<header>

  <h1><?=anchor(base_url(),'DVI Gruppe');?></h1>

  <nav>

    <button class="toggle clickable">Navigation</button>

    <ul>
      <li class="residential primary">
        <?=anchor(PROPERTIES_PATH. '/wohnen', 'Wohnen');?>
      </li>
      <li class="commercial primary">
        <?=anchor(PROPERTIES_PATH. '/gewerbe', 'Gewerbe');?>
      </li>
      <li class="development primary">
        <?=anchor(PROPERTIES_PATH. '/entwicklung', 'Entwicklung');?>
      </li>
      <li class="home secondary">
        <?=anchor(base_url(), 'Startseite');?>
      </li>
      <li class="about-us secondary">
        <?=anchor(ABOUT_PATH, 'Über <abbr title="Deutsche Vermögens- und Immobilienverwaltung">DVI</abbr>');?>
      </li>
      <li class="profiles secondary">
        <?=anchor(PROFILES_PATH, 'Ankaufsprofile');?>
      </li>
      <li class="funds secondary">
        <?=anchor(FUNDS_PATH, 'Fonds');?>
      </li>
      <li class="contact secondary">
        <?=anchor(CONTACT_PATH, 'Kontakt');?>
      </li>
    </ul>
  </nav>

</header>
