<?php
// Remove all default WP template redirects/lookups
remove_action('template_redirect', 'redirect_canonical');

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
    add_rewrite_rule('^/(.+)/?', 'index.php', 'top');
}
add_action('init', 'remove_redirects');

// Load scripts
function load_vue_scripts() {
    wp_enqueue_style('blankslate/app.css', get_template_directory_uri() . '/dist/styles/app.css', false, null);
    wp_enqueue_style('custom-theme', get_template_directory_uri() . '/dist/assets/css/bk.css', false, null);
    wp_enqueue_style('custom-style', get_template_directory_uri() . '/dist/assets/css/style.css', false, null);
    wp_enqueue_script('blankslate/manifest.js', get_template_directory_uri() . '/dist/scripts/manifest.js', null, null, true);
    wp_enqueue_script('blankslate/vendor.js', get_template_directory_uri() . '/dist/scripts/vendor.js', null, null, true);
    wp_enqueue_script('blankslate/app.js', get_template_directory_uri() . '/dist/scripts/app.js', null, null, true);
}
add_action('wp_enqueue_scripts', 'load_vue_scripts', 100);

// Disabled comments login (for rest post comment)
function filter_rest_allow_anonymous_comments() {
    return true;
}
add_filter('rest_allow_anonymous_comments','filter_rest_allow_anonymous_comments');

function arphabet_widgets_init() {

	register_sidebar( array(
		'name'          => 'main',
		'id'            => 'left',
		'before_widget' => '<div>',
		'after_widget'  => '</div>',
		'before_title'  => '<h2 class="rounded">',
		'after_title'   => '</h2>',
	) );

}
add_action( 'widgets_init', 'arphabet_widgets_init' );

function register_my_menu() {
  register_nav_menu( 'nav', __( 'Primary Menu', 'maple-theme' ) );
}
add_action( 'after_setup_theme', 'register_my_menu' );

/*
    =======================
        默认路由路径修正
    =======================
    前端路由结构：
        文章:   /archives/[文章名称]
        页面:   /page/[名称]
        搜索:   /search/[关键字]
        分类:   /category/[名称]
*/
function fix_permalinks() {
    global $wp_rewrite;
    $wp_rewrite->set_permalink_structure( '/archives/%postname%/');
    $wp_rewrite->set_category_base( 'category');
    $wp_rewrite->set_tag_base( 'tag');
}
add_action( 'init', 'fix_permalinks' );

/* 修正Search */
function ml_fix_search_url() {
    if ( is_search() && ! empty( $_GET['s'] ) ) {
        wp_redirect( home_url( "/search/" ) . urlencode( get_query_var( 's' ) ) );
        exit();
    }   
}
add_action( 'template_redirect', 'ml_fix_search_url' );
