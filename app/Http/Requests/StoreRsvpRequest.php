<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreRsvpRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, ValidationRule|string>>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:120'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Παρακαλούμε συμπληρώστε το όνομά σας.',
            'name.min' => 'Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες.',
            'name.max' => 'Το όνομα δεν μπορεί να ξεπερνά τους 120 χαρακτήρες.',
        ];
    }
}
