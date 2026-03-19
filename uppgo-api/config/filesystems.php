<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    */

    'default' => env('FILESYSTEM_DISK', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    */

    'disks' => [

        /*
        |-----------------------
        | LOCAL (PRIVATE)
        |-----------------------
        */
        'local' => [
            'driver' => 'local',
            'root' => storage_path('app/private'),
        ],

        /*
        |-----------------------
        | PUBLIC (LOCAL DEV)
        |-----------------------
        */
        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => rtrim(env('APP_URL'), '/') . '/storage',
            'visibility' => 'public',
        ],

        /*
        |-----------------------
        | GOOGLE CLOUD STORAGE
        |-----------------------
        */
        'gcs' => [
            'driver' => 'gcs',
            'project_id' => env('GOOGLE_CLOUD_PROJECT_ID'),
            'bucket' => env('GOOGLE_CLOUD_STORAGE_BUCKET'),
            
            // ✅ THE OFFICIAL FIX FOR UNIFORM BUCKETS
            'visibility_handler' => \League\Flysystem\GoogleCloudStorage\UniformBucketLevelAccessVisibility::class,
            
            'key_file' => null,
            'throw' => true, 
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Symbolic Links
    |--------------------------------------------------------------------------
    */

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];