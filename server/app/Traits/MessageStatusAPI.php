<?php

namespace App\Traits;

trait MessageStatusAPI
{
    /**
     * Message Show
     * 
     * @return string
     */
    public static function detail($request)
    {
        return response()->json(['request' => $request, 'message' => 'Retrieved successfully'], 400);
    }
    
    public static function show($data = null, $message = 'Retrieved successfully', $statusCode = 200)
    {
        return response()->json([
            'data' => $data,
            'message' => $data == null ? 'Data not found' : $message,
        ], $data == null ? 404 : $statusCode);
    }
    
    /**
     * Message Store
     * 
     * @return string
     */
    public static function store()
    {
        return response()->json([
            'message' => 'Created successfully'
        ], 201);
    }

    /**
     * Message Update
     * 
     * @return string
     */
    public static function update()
    {
        return response([
            'message' => 'Updated successfully'
        ], 200);
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
