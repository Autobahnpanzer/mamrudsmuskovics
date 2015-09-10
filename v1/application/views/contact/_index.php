<div class="clearfix  " id="main">

  <section class="">

    <div class="boxed">

      <h2 class="title">Kontakt</h2>

      <?=validation_errors();?>

        <? if($mail_sent==TRUE): ?>
        <p class="alert alert-success">Mitteilung gesendet. Vielen Dank!</p>
        <? endif; ?>

        <?=form_open(CONTACT_PATH, array( 'method'=> 'post', 'class' => 'default')); ?>
          <fieldset>
            <label for="form_sender_name">Name</label>
            <input type="text" name="sender_name" required="required" id="form_sender_name" class="txt name" value="<?=set_value('sender_name');?>" />
            <label for="form_sender_email">E&#8209;Mail</label>
            <input type="text" name="sender_mail" required="required" id="form_sender_email" class="txt email" value="<?=set_value('sender_mail');?>" />
            <label for="form_sender_phone">Telefon</label>
            <input type="text" name="sender_phone" id="form_sender_phone" class="txt phone" value="<?=set_value('sender_phone');?>" />
            <label for="form_sender_text">Nachricht</label>
            <textarea name="text" id="form_sender_text" rows="6" cols="40">
              <?=set_value( 'text');?>
            </textarea>
          </fieldset>
          <fieldset class="buttons">
            <input type="submit" name="submit" class="btn send" value="Senden" />
          </fieldset>
          <?=form_close();?>

            <div class="vcard">
              <h3 class="fn org"><abbr title="Deutsche Vermögens- und Immobilienverwaltung">DVI</abbr> Services GmbH</h3>
              <address class="adr">
          <span class="street-address">Gartenstraße 50</span>
          <span class="postal-code">12529</span>
          <span class="locality">Schönefeld</span>
        </address>
              <span class="tel">
          Telefon
          <span class="type">work</span>
              <span class="value">+49</span> <span class="value">30</span> <span class="value">634128842</span>
              </span>
              <span class="tel">
          Telefax
          <span class="type">fax</span>
              <span class="value">+49</span> <span class="value">30</span> <span class="value">887182</span>-<span class="value">17</span></span>
              <a href="mailto:info@dvi.de" class="email">info@dvi.de</a>
            </div>
            <div class="vcard">
              <h3 class="fn org">Berlin Office</h3>
              <address class="adr">
          <span class="street-address">Am Borsigturm 53</span>
          <span class="postal-code">13507</span>
          <span class="locality">Berlin</span>
        </address>
              <span class="tel">
          Telefon
          <span class="type">work</span>
              <span class="value">+49</span> <span class="value">30</span> <span class="value">887182</span>-<span class="value">18</span>
              </span>
              <span class="tel">
          Telefax
          <span class="type">fax</span>
              <span class="value">+49</span> <span class="value">30</span> <span class="value">887182</span>-<span class="value">17</span>
              </span>
              <a href="mailto:info@dvi.de" class="email">info@dvi.de</a>
            </div>
    </div>
  </section>
</div>
