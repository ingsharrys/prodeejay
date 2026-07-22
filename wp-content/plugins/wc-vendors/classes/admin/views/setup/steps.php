<?php
/**
 * Admin View: Setup Steps
 *
 * @version 2.6.5 - Fix security issues.
 *
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$step        = $this->step;
$step_index  = array_search( $step, array_keys( $this->steps ), true );
$total_steps = count( $this->steps );
$step_width  = 100 / $total_steps;
if ( $step_index === $total_steps - 1 ) {
    $progress = 100;
} else {
    $progress = ( $step_index * $step_width ) + ( $step_width / 2 );
}

?>
<div class="wcv-setup-step-progress-container">
    <div class="wcv-setup-step-progress">
        <div class="wcv-setup-step-progress-bar" style="width: <?php echo esc_attr( $progress ); ?>%;"></div>
    </div>
    <ol class="wcv-setup-steps">
        <?php
        $step_index = 1;
        foreach ( $output_steps as $step_key => $step ) :
            $is_done   = array_search( $this->step, array_keys( $this->steps ), true ) > array_search( $step_key, array_keys( $this->steps ), true );
            $is_active = $step_key === $this->step;
            $is_last   = 'finish' === $step_key;
        ?>
            <li class="<?php echo $is_active ? 'active' : ( $is_done ? 'done' : '' ); ?>" <?php echo ( $is_done ) ? '' : 'data-step="' . esc_attr( $step_index ) . '"'; ?>>
                <?php if ( $is_done ) : ?>
                    <span class="wcv-step-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"/></svg>
                    </span>
                <?php endif; ?>
                <span class="wcv-setup-step-name"><?php echo esc_html( $step['name'] ); ?></span>
                <br/>
                <small><?php echo esc_html( $step['desc'] ); ?></small>
            </li>
        <?php
        ++$step_index;
        endforeach;
        ?>
    </ol>
</div>
