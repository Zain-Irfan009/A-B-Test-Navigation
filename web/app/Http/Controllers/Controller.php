<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    use AuthorizesRequests;
    use DispatchesJobs;
    use ValidatesRequests;


    public function CustomerData(Request $request){

        try {
            $shop = getShop($request->get('shopifySession'));
            $setting = Setting::first();

            $user = User::where('email', $request->email)->first();
            if ($user) {
                $show = $user->navigation;
                if($show==1){
                    $setting->navigation1_count=$setting->navigation1_count +1;
                }elseif($show==2){
                    $setting->navigation2_count=$setting->navigation2_count +1;
                }
                $setting->total_count=$setting->total_count +1;
                $setting->save();
            }
            else {
                $user=new User();
                $user->ip_address=$request->ip_address;
                $user->email=$request->email;
                $user->shop_id=$shop->id;
                $user->save();

                $total_count = $setting->total_count;
                $nav1_count = $setting->navigation1_count;
                $nav2_count = $setting->navigation2_count;
                $audience_size = $setting->audience_size;

                if ($total_count != 0) {
                    $percentage = ($nav1_count / $total_count) * 100;
                } else {
                    $percentage = 0; // Avoid division by zero error
                }

                if ($percentage <= $audience_size) {
                    $show = 1;
                    $setting->navigation1_count=$setting->navigation1_count +1;

                } else {
                    $show = 2;
                    $setting->navigation2_count=$setting->navigation2_count +1;

                }
                $setting->total_count=$setting->total_count +1;
                $setting->save();

                $user->navigation = $show;
                $user->save();
            }

            $data = [
                "success" => true,
                "navigation" => $show
            ];
        }catch (\Exception $exception){
            $data = [
                "success" => false,
                "message"=>$exception->getMessage()
            ];
        }
        return response()->json($data);
    }
}
