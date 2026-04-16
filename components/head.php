<?php
/**
 * HTML <head> Component
 *
 * Usage: include 'components/head.php';
 *
 * Variables (set before including):
 *   $page_title   — page-specific title, e.g. 'Home', 'Notes'
 *   $extra_css    — (optional) array of additional CSS hrefs
 *                   e.g. ['css/admin.css']
 */

$page_title = $page_title ?? 'Portfolio';
$extra_css  = $extra_css  ?? [];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[ Portfolio ] — <?= htmlspecialchars($page_title) ?></title>
  <link rel="stylesheet" href="css/styles.css" />
  <?php foreach ($extra_css as $css): ?>
  <link rel="stylesheet" href="<?= htmlspecialchars($css) ?>" />
  <?php endforeach; ?>
