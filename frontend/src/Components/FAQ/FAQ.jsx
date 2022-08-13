import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import './Faq.scss'
function FAQ(props) {
    return (
        <>
        <div className='faq'>
            <div className='container'>
            
            <h1>FAQs </h1>
            <h5>Hours of Operation: </h5>
            <br/>
            <h6>Our Cosmoline support team is available:</h6>
            <p>Monday-Friday: 7-4PM PT. The Cosmoline support team is not available Saturdays and Sundays, as well as on Thanksgiving Day, Christmas, and New Years Day.  </p>
            <hr/>
            <h5>FORMULAS YOU CAN TRUST</h5>
            <p>Because “clean" beauty lacks a regulatory definition by the Food and Drug Administration, we chose not to market our brand as "clean." But rest assured, our products are thoughtfully formulated, thoroughly tested, and made to comply with worldwide regulations of quality and safety—you have our word. Rare Beauty is cruelty free, vegan, and certified by PETA’s Global Beauty Without Bunnies.</p>
            <hr/>

            <h5>ALLERGY </h5><br/>
            <h6>Q: Help! I had an allergic or other adverse reaction! </h6>
            <p>A: If you have any adverse reactions to our products, please contact your health care provider immediately. If it is an emergency, please call 911. For general questions about our products, please contact our Cosmoline  support team for assistance at 1-888-892-7273 or hello@cosmoline.com </p>
          <hr/>
          <h5>MY ORDER </h5><br/>
          <h6>Q: Help my order is missing!? </h6>
          <p>A: Oh no! Please contact our support team for assistance at 1-888-892-7273 or hello@cosmoline.com </p>
         <h6>Q: How do I change or cancel my order? </h6>
         <p>A: In an effort to ship out your products efficiently, we immediately begin processing your order as soon as it is placed. Unfortunately, once orders are submitted, they cannot be canceled or modified.  </p>
         <h6>Q: My order is missing an item, what should I do? </h6>
         <p>A: Please contact us right away at 1-888-892-7273 or hello@cosmoline.com. </p>
         <h6>Q: I typed in my wrong address and need to change it </h6>
         <p>A: Unfortunately, once orders are submitted, they cannot be canceled or modified.  

</p>
<hr/>

<h5>OTHER (RETURNS/EXCHANGES/MY ACCOUNT ETC.) </h5><br/>
<h6>Q: Are returns free? </h6>
<p>A: For U.Sl orders, items returned within 30 days of purchase qualify for free return shipping. Donations are non-refundable. Note you are allowed 1 exchange on your original order.

Unfortunately, international orders cannot be returned or exchanged. For additional information please contact customer service at hello@cosmoline.com</p>
<h6>Q: Are your products vegan? </h6>
<p>A: Yes, all our products are 100% vegan.   </p>
<h6>Q: Are your products cruelty-free? </h6>
<p>A: Yes, all our products are cruelty-free, meaning we do not test on animals. 

</p>
<Navbar/>
</div>

        </div>
        <Footer/>
        </>
    );
}

export default FAQ;