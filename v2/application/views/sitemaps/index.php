<?= '<?xml version="1.0" encoding="UTF-8" ?>' ?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc><?= base_url();?></loc>
        <priority>1.0</priority>
    </url>
    <url>
        <loc><?= base_url(CONTACT_PATH);?></loc>
        <priority>0.1</priority>
    </url>
    <url>
        <loc><?= base_url(IMPRINT_PATH);?></loc>
        <priority>0.1</priority>
    </url>
    <url>
        <loc><?= base_url(ABOUT_PATH);?></loc>
        <priority>0.6</priority>
    </url>
    <url>
        <loc><?= base_url(DVI_PATH);?></loc>
        <priority>0.9</priority>
    </url>
    <url>
        <loc><?= base_url(FUNDS_PATH);?></loc>
        <priority>0.7</priority>
    </url>
  <url>
        <loc><?= base_url(PURCHASE_PATH);?></loc>
        <priority>0.7</priority>
    </url>
    <url>
        <loc><?= base_url(PROPERTIES_PATH.'/wohnen');?></loc>
        <priority>0.7</priority>
    </url>
    <url>
        <loc><?= base_url(PROPERTIES_PATH.'/gewerbe');?></loc>
        <priority>0.7</priority>
    </url>
    <url>
        <loc><?= base_url(PROPERTIES_PATH.'/entwicklung');?></loc>
        <priority>0.7</priority>
    </url>
    <? foreach($urls as $url) { ?>
    <url>
        <loc><?=$url['url'];?></loc>
        <priority><?=$url['priority'];?></priority>
    </url>
    <? } ?>

</urlset>
