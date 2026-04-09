<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravel\Ai\Enums\Lab;
use Laravel\Ai\Image;

class GenerateWeddingImages extends Command
{
    protected $signature = 'wedding:generate-images {--only= : Generate a specific image by key}';

    protected $description = 'Generate wedding invitation images using Gemini AI';

    /** @return array<string, array{prompt: string, filename: string}> */
    private function imagePrompts(): array
    {
        return [
            'envelope-closed' => [
                'prompt' => 'Elegant luxury wedding invitation envelope, closed front view, centered composition, deep muted olive green matte premium paper texture, refined golden wax seal in the center with intertwined initials, soft studio lighting, romantic editorial aesthetic, isolated on transparent background, minimal shadow, high detail, premium stationery, no text',
                'filename' => 'envelope-closed.png',
            ],
            'envelope-open' => [
                'prompt' => 'Open luxury wedding invitation envelope, front-facing, deep muted olive green paper, elegant diamond-shaped open flap revealing cream interior, premium stationery texture, refined romantic editorial style, isolated on transparent background, soft realistic lighting, minimal shadow, high detail, no text',
                'filename' => 'envelope-open.png',
            ],
            'floral-left' => [
                'prompt' => 'Delicate romantic floral arrangement for luxury wedding stationery, blush pink roses, soft cream peonies, subtle sage greenery, airy asymmetric composition, transparent PNG style isolated element, left-side decorative cluster, realistic soft lighting, premium editorial aesthetic, watercolor feel, no text',
                'filename' => 'floral-left.png',
            ],
            'venue-hero' => [
                'prompt' => 'Luxury Mediterranean wedding venue, romantic outdoor garden setting with olive trees and stone pathways, warm golden hour natural light, editorial wedding photography style, elegant archway entrance, refined composition, premium timeless aesthetic, high detail, landscape orientation',
                'filename' => 'venue-hero.jpg',
            ],
            'couple-strip' => [
                'prompt' => 'Romantic couple walking hand in hand at sunset in an elegant garden, soft natural backlight, editorial wedding photography, intimate and refined mood, warm golden tones, timeless luxury aesthetic, landscape crop, high detail',
                'filename' => 'couple-strip.jpg',
            ],
            'venue-ceremony' => [
                'prompt' => 'Outdoor wedding ceremony setup, elegant white chairs in rows, floral arch with greenery and blush flowers, romantic garden chapel atmosphere, editorial wedding photography, warm soft afternoon light, premium luxury aesthetic, high detail',
                'filename' => 'venue-ceremony.jpg',
            ],
            'venue-ceremony-2' => [
                'prompt' => 'Beautiful outdoor wedding ceremony aisle view from above, rows of wooden chairs with white draping, flower petals on the path, garden setting with tall trees, editorial wedding photography, soft warm light, refined premium aesthetic',
                'filename' => 'venue-ceremony-2.jpg',
            ],
            'venue-reception' => [
                'prompt' => 'Luxury outdoor wedding reception, elegant long table with refined floral centerpieces in blush and green, crystal glassware, candlelight, romantic evening garden ambiance, editorial wedding photography, warm golden light, premium timeless aesthetic, high detail',
                'filename' => 'venue-reception.jpg',
            ],
            'venue-reception-2' => [
                'prompt' => 'Beautiful outdoor wedding reception overview, round tables with white linen under string lights, garden party setting, floral arrangements, editorial wedding photography, golden hour, luxury romantic aesthetic, high detail',
                'filename' => 'venue-reception-2.jpg',
            ],
        ];
    }

    public function handle(): int
    {
        $prompts = $this->imagePrompts();
        $only = $this->option('only');

        if ($only && ! isset($prompts[$only])) {
            $this->error("Unknown image key: {$only}. Available: " . implode(', ', array_keys($prompts)));

            return self::FAILURE;
        }

        $toGenerate = $only ? [$only => $prompts[$only]] : $prompts;

        $this->info('Generating ' . count($toGenerate) . ' wedding images with Gemini...');
        $bar = $this->output->createProgressBar(count($toGenerate));
        $bar->start();

        $storagePath = public_path('images/wedding');

        foreach ($toGenerate as $key => $config) {
            $targetPath = $storagePath . '/' . $config['filename'];

            if (file_exists($targetPath) && ! $only) {
                $this->newLine();
                $this->comment("  Skipping {$config['filename']} (already exists)");
                $bar->advance();

                continue;
            }

            try {
                $this->newLine();
                $this->info("  Generating: {$key}...");

                $image = Image::of($config['prompt'])
                    ->square()
                    ->quality('high')
                    ->timeout(120)
                    ->generate(provider: Lab::Gemini);

                file_put_contents($targetPath, (string) $image);

                $this->info("  Saved: {$config['filename']}");
            } catch (\Throwable $e) {
                $this->newLine();
                $this->error("  Failed to generate {$key}: {$e->getMessage()}");
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);
        $this->info('Done! Images saved to: public/images/wedding/');

        return self::SUCCESS;
    }
}
