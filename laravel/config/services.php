<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    // Interruptores de métodos de pago (el de Stripe queda apagado
    // hasta que se quiera escalar a suscripciones con tarjeta).
    'payments' => [
        'stripe' => env('PAYMENT_STRIPE', false),
    ],

    // Inicio de sesión con Google (app móvil). IDs de cliente OAuth de
    // Google Cloud Console; el botón se oculta si no están configurados.
    'google' => [
        'web_client_id'     => env('GOOGLE_WEB_CLIENT_ID'),
        'ios_client_id'     => env('GOOGLE_IOS_CLIENT_ID'),
        'android_client_id' => env('GOOGLE_ANDROID_CLIENT_ID'),
    ],

    // Porcentajes del reporte de liquidación por DJ.
    'reporte' => [
        'impuesto_pct' => env('REPORTE_IMPUESTO_PCT', 0.3),   // % sobre el neto
        'comision_pct' => env('REPORTE_COMISION_PCT', 30),    // % de la plataforma
    ],

    'square' => [
        'access_token' => env('SQUARE_ACCESS_TOKEN'),
        'location_id' => env('SQUARE_LOCATION_ID'),
        'mode' => env('SQUARE_MODE', 'sandbox'),
    ],

    'paypal' => [
        'client_id' => env('PAYPAL_CLIENT_ID'),
        'secret' => env('PAYPAL_SECRET'),
        'mode' => env('PAYPAL_MODE', 'sandbox'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

];
