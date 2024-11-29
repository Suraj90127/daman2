import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import Img1 from "../../assets/biggener/img1.PNG"
import Img2 from "../../assets/biggener/img2.PNG"
import Img3 from "../../assets/biggener/img3.PNG"
import Img4 from "../../assets/biggener/img4.PNG"
import Img5 from "../../assets/biggener/img5.PNG"
import Img6 from "../../assets/biggener/img6.PNG"
import Img7 from "../../assets/biggener/img7.PNG"
import Img8 from "../../assets/biggener/img8.PNG"
import Img9 from "../../assets/biggener/img9.PNG"
import Img10 from "../../assets/biggener/img10.PNG"
import Img11 from "../../assets/biggener/img11.PNG"

const Beginner = () => {
  return (
    <>
        <div className='nav-bg p-1 py-3 sticky top-0'>
                <div className="container-section flex  items-center relative">
                    <button className='absolute'><Link to={"/main"}>  <IoIosArrowBack className='text-xl' /></Link></button>
                    <h1 className='heading-h1 gray-50  text-lg text-center flex justify-center items-center m-auto'>Beginner's Guide</h1>
                </div>
            </div>
            <div >   

      </div>

      <div className="container-section mt-5">
 <h4 className="heading-h4 gray-50 font-medium">  1.How to Register </h4>
      <p className='mb-3 fs-sm gray-100 '>          

-Fill Your Phone Number <br />
-Set Your Own Password (6 letters) <br />
-Confirm The Password <br />
-Fill Your Recommend Code <br />
-Click I Have Read And Agree <br />
-Click Register
      </p>
      <img src={Img1} alt="" />
 <h4 className="heading-h4 gray-50 font-medium"> 2. How to betting</h4>
      <p className='mb-3 fs-sm gray-100 '>    
Click start game then choose 1 minute, 3 minute, 5 minute or 10 minute. <br />
Green: if the result shows 1,3,7,9 <br />
Red: if the result shows 2,4,6,8 <br />
Violet: if the result shows 0 or 5 <br />
Small: if the result shows 0,1,2,3,4 <br />
Big: if the result shows 5,6,7,8,9 <br />
This company not allowed to place Illegal betting <br />
Exp: Betting (Big and small together) or (Red and Green together) in the same time. <br />
      </p>
      <img src={Img2} alt="" />
 <h4 className="heading-h4 gray-50 font-medium"> 3.How to recharge </h4>
      <p className='mb-3 fs-sm gray-100 '>    
      

Click Wallet Icon, Click The Recharge Button, and we have five ways to make a recharge (BANK TRANSFER, E- WALLET,) <br />
      </p>
      <img src={Img3} alt="" />
 <h4 className="heading-h4 gray-50 font-medium">  4. How to Withdraw </h4>
      <p className='mb-3 fs-sm gray-100 '>        

Click Wallet Icon, Click Withdraw Button. <br />
-Enter withdraw amount <br />
-Make Sure Your Total Bet Until Zero <br />
-Select Your Bank Account Or Add Your Bank Account <br />
-Input Amount You Want To Withdraw <br />
-Input Your Login Password<br />
      </p>
      <img src={Img4} alt="" />
 <h4 className="heading-h4 gray-50 font-medium">     5. Orders </h4>
      <p className='mb-3 fs-sm gray-100 '>   
When The Betting Complete You Can Click My Game Record To See Your Bet Record, You Can Check The Chart Trend.<br />
      </p>
      <img src={Img5} alt="" />
 <h4 className="heading-h4 gray-50 font-medium">        6.Promotion </h4>
      <p className='mb-3 fs-sm gray-100 '>   
   -If you have a downline or referral member use your own link to register and if they make a recharge you can claim a reward. The agent will get a minimum commission of 0.6% (level 1) and 0.18% (level 2) from each transaction that is done by the referral (Added every day at 00:30 AM.) If the accumulated transactions of the Referral reach a certain target, the agent will get an additional bonus with the following rebates.
-You Can Click The Sharing Invitation Poster To See The Barcode<br />
      </p>
      <img src={Img6} alt="" />
 <h4 className="heading-h4 gray-50 font-medium">      7. Account security </h4>
      <p className='mb-3 fs-sm gray-100 '>   

Go To My Icon, Click Setting Icon.
-Click Login Password. -Re-Enter Your Login Password.
-Enter Strongest New Password, and Confirm Your Password.
-Click Save Changes.<br />
      </p>
      <img src={Img7} alt="" />
 <h4 className="heading-h4 gray-50 font-medium">    8. Forgot Password</h4>
      <p className='mb-3 fs-sm gray-100 '> 

-If You Forget Your Login Password, Please Contact Customer Service Immediately<br />
      </p>
      <img src={Img8} alt="" />
 <h4 className="heading-h4 gray-50 font-medium">   9. App download</h4>
      <p className='mb-3 fs-sm gray-100 '> 

-Click top right corner download icon, your can download the app and easy to use<br />
      </p>
      <img src={Img9} alt="" />
 <h4 className="heading-h4 gray-50 font-medium">   10.About</h4>
      <p className='mb-3 fs-sm gray-100 '> 

      -Click About for more details regarding Privacy Policy and Risk Disclosure Agreement.<br />
      </p>
      <img src={Img10} alt="" />
 <h4 className="heading-h4 gray-50 font-medium"> 11. Gift</h4>
      <p className='mb-3 fs-sm gray-100 '> 

-Click Gift Exchange <br />
-Input The Unique Code To Redemption Code The Money <br />
-Click Receive<br />
      </p>
      <img src={Img11} alt="" />


      </div>
    </>
  )
}

export default Beginner
