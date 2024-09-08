<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3'],
            'description' => ['required', 'string', 'min:3'],
            'price' => ['required', 'numeric', 'min:0'],
            'expiration_date' => ['required', 'date', 'after:today'],
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'category_id' => [
                'required', 'numeric', 'min:0'
            ],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'O nome é obrigatório.',
            'name.string' => 'O nome deve ser uma string.',
            'name.min' => 'O nome deve ter pelo menos 3 caracteres.',

            'description.required' => 'A descrição é obrigatória.',
            'description.string' => 'A descrição deve ser uma string.',
            'description.min' => 'A descrição deve ter pelo menos 3 caracteres.',

            'price.required' => 'O preço é obrigatório.',
            'price.numeric' => 'O preço deve ser um número.',
            'price.min' => 'O preço deve ser maior que 0.',

            'expiration_date.required' => 'A data de validade é obrigatória.',
            'expiration_date.date' => 'A data de validade deve ser uma data válida.',
            'expiration_date.after' => 'A data de validade deve ser uma data depois de hoje.',

            'category_id.required' => 'A categoria é obrigatória.',
            'category_id.numeric' => 'A categoria deve ser um número.',
            'category_id.min' => 'A categoria deve ser maior que 0.',
        ];
    }
}
