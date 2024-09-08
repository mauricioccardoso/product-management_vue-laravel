<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
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
            'name' => ['required', 'min:3', 'string'],
            'email' => [
                'required',
                'email',
                'unique:users,email'
            ],
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
            ],
            'password_confirmation' => [
                'required',
                Password::min(8)
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
            'name.required' => 'O campo nome é obrigatório.',

            'email.email' => 'O email deve ser um endereço de email válido.',
            'email.unique' => 'Este email já está registrado.',

            'password.required' => 'O campo senha é obrigatório.',
            'password.confirmed' => 'As senhas não corresponde.',
            'password.min' => 'A senha deve ter pelo menos :min caracteres.',
            'password_confirmation.required' => 'O campo confirmação de senha é obrigatório.',
            'password_confirmation.min' => 'O campo confirmação da senha deve ter pelo menos :min caracteres.',

            '*.required' => 'O campo :attribute é obrigatório.',
            '*.min' => 'O campo :attribute deve ter pelo menos :min caracteres.',
            '*.string' => 'O campo :attribute deve ser um conjunto de caracteres.',
        ];
    }
}
