<?php

namespace App\Traits;

trait MessageStatusAPI
{
    /**
     * Message Show
     * 
     * @return string
     */
    public static function show()
    {
        return 'Retrieved successfully';
    }
    public static function detail($request)
    {
        return response()->json(['request' => $request, 'message' => 'Retrieved successfully'], 400);
    }
    /**
     * Message Store
     * 
     * @return string
     */
    public static function store()
    {
        return 'Created successfully';
    }

    /**
     * Message Update
     * 
     * @return string
     */
    public static function update()
    {
        return 'Updated successfully';
    }

    /**
     * Message Destroy
     *
     * @return \Illuminate\Http\Response
     **/
    public static function destroy()
    {
        return response()->json(['message' => 'Deleted successfully'], 200);
    }

    /**
     * Display a error when input is invalid.
     *
     * @param Illuminate\Support\Facades\Validator $validator
     * @return \Illuminate\Http\Response
     */
    public static function displayInvalidInput($validator)
    {
        return response()->json(['error' => $validator->errors(), 'message' => 'Invalid input'], 400);
    }

    /**
     * Not found
     *
     * @return \Illuminate\Http\Response
     */
    public static function notFound()
    {
        return response()->json(['message' => 'Not found'], 404);
    }
}
