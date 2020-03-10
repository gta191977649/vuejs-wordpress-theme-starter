<?php status_header(200); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <title><?php echo get_bloginfo('name') ?> - <?php echo get_bloginfo( 'description' )?></title>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="renderer" content="webkit">
  <link href="https://fonts.googleapis.com/css?family=Noto+Serif+JP|Noto+Serif+KR|Noto+Serif+SC|Noto+Serif+TC&display=swap" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body>
  <div id="app"></div>
  <?php wp_footer(); ?>
</body>
</html>