<?php
/**
 * Scripts Component
 *
 * Usage: include 'components/scripts.php';
 *
 * Variables (set before including):
 *   $extra_scripts — (optional) array of additional script srcs
 *                    e.g. ['js/quiz.js']
 *
 * Place this just before </body>.
 */

$extra_scripts = $extra_scripts ?? [];
?>
<script src="js/main.js"></script>
<script src="js/settings.js"></script>
<script src="js/auth.js"></script>
<?php foreach ($extra_scripts as $src): ?>
<script src="<?= htmlspecialchars($src) ?>"></script>
<?php endforeach; ?>
