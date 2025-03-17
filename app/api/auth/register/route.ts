import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";



export const POST = async  (request:NextRequest) =>{
    try{
        const {email,password} =await request.json();
        if(!email || !password){
            return NextResponse.json(
                {error:"Email and Password requiered"},
                {status:400},
            )
        }
        
       await connectToDatabase();

       const existingUser= await User.findOne({email});

       if(existingUser){
        return NextResponse.json(
            {error:"Email is  already registered"},
            {status:400},
        )
      }

      await User.create({
        email,
        password
      });

      return NextResponse.json(
        {message:"User registered sucessfully"},
        {status:201},
    )

    } catch(error){
        console.log(error);
        
        return NextResponse.json(
            {error:"Failed to register user"},
            {status:500},
        )
    }
}