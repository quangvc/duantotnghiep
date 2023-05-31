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

    /**
     * Super Admin exists with mail
     * 
     * @return \Illuminate\Http\Response
     */
    public static function superAdminExistWithMail()
    {
        return response()->json(['message' => 'Super Admin exists with mail'], 400);
    }

    public static function exception()
    {
        return response()->json(['message' => 'An error occurred, please try again later']);
    }
}
