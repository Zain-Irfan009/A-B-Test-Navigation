<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('navigation1')->nullable();
            $table->string('navigation2')->nullable();
            $table->integer('audience_size')->nullable();
            $table->bigInteger('total_count')->default(0);
            $table->bigInteger('navigation1_count')->default(0);
            $table->bigInteger('navigation2_count')->default(0);
            $table->integer('shop_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
