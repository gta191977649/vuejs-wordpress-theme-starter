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
    wp_enqueue_script('blankslate/QAQ.js', '//api.buncho.moe/fuckshitbrowser/QAQ.js', null, null, true);
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

/* 开启连接管理器 */
add_filter( 'pre_option_link_manager_enabled', '__return_true' );


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

// 评论回应邮件通知
function comment_mail_notify($comment_id) {
    $admin_email = get_bloginfo ('admin_email'); 
    $comment = get_comment($comment_id);
    $comment_author_email = trim($comment->comment_author_email);
    $parent_id = $comment->comment_parent ? $comment->comment_parent : '';
    $to = $parent_id ? trim(get_comment($parent_id)->comment_author_email) : '';
    $spam_confirmed = $comment->comment_approved;
    if (($parent_id != '') && ($spam_confirmed != 'spam') && ($to != $admin_email)) {
      $wp_email = 'no-reply@' . preg_replace('#^www\.#', '', strtolower($_SERVER['SERVER_NAME']));
      $subject = '您在 [' . get_option("blogname") . '] 的留言有了新回复';
      $message = '<h1>您在 ' . get_option('blogname') . ' 博客上的留言有回复啦！</h1><hr/><div style="background-color:#FFF; border:1px solid #666666; color:#111; -moz-border-radius:8px; -webkit-border-radius:8px; -khtml-border-radius:8px; border-radius:8px; font-size:12px; width:702px; margin:0 auto; margin-top:10px; font-family:微软雅黑, Arial;">   <div style="background:#2c9b0a; width:100%; height:60px; color:white; -moz-border-radius:6px 6px 0 0; -webkit-border-radius:6px 6px 0 0; -khtml-border-radius:6px 6px 0 0; border-radius:6px 6px 0 0; "><span style="height:60px; line-height:60px; margin-left:30px; font-size:12px;">您在 <a style="text-decoration:none; color:#000;font-weight:600;" href="' . get_option('home') . '"><strong>' . get_option("blogname") . '</strong></a> 上<strong>《' . get_the_title($comment->comment_post_ID) . '》</strong>有一个评论回复</span></div>   
      <div style="width:90%; margin:0 auto"><br/><p>您在<strong>《' . get_the_title($comment->comment_post_ID) . '》</strong>留下的评论是：</p>   
      <p style="background-color: #EEE;border: 1px solid #DDD;padding: 20px;margin: 15px 0;">' . nl2br(get_comment($parent_id)->comment_content) . '</p>   
      <p>' . trim($comment->comment_author) . ' 给您的新回复如下：<p style="background-color: #EEE;border: 1px solid #DDD;padding: 20px;margin: 15px 0;">' . nl2br($comment->comment_content) . '</p>   
      <p>您可以点击“<a href="' . htmlspecialchars(get_comment_link($parent_id)) . '">这里</a>”查看评论   
      </p>如果你不能点击上面的链接可以吧下面的链接复制到地址栏中访问   
      <p style="background-color: #EEE;border: 1px solid #DDD;padding: 20px;margin: 15px 0;"><a href="' . htmlspecialchars(get_comment_link($parent_id)) . '">' . htmlspecialchars(get_comment_link($parent_id)) . '</a></p>   
      <p>欢迎再次光临 <a style="text-decoration:none; color:#2c9b0a" href="' . get_option('home') . '">' . get_option('blogname') . '</a></p>   
      <p>注意：此邮件由系统发出，请勿回复！</p>   
      </div></div>';
      $from = "From: \"" . get_option('blogname') . "\" <$wp_email>";
      $headers = "$from\nContent-Type: text/html; charset=" . get_option('blog_charset') . "\n";
      wp_mail( $to, $subject, $message, $headers );
    }
  }
  add_action('comment_post', 'comment_mail_notify');