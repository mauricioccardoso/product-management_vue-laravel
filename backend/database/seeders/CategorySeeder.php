<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;


    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Tecnologia'],
            ['name' => 'Saúde'],
            ['name' => 'Ferramentas'],
            ['name' => 'Educação'],
            ['name' => 'Limpeza'],
        ];

        DB::table('categories')->insert($categories);
    }
}
