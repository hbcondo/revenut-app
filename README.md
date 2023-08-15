<div align="center">
  <a href="https://revenut.com/" style="color: black;">
    <img alt="revenut" src="docs/assets/Revenut-logo-128x128.png" width="128" height="128">
    <h1>Revenut</h1>
  </a>
</div>

<div align="center">
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />

  <h3 align="center">SaaS Metrics in a Nutshell</h3>
  <a href="https://github.com/hbcondo/revenut-app/wiki">Wiki</a> | <a href="https://app.revenut.com">Demo</a>
</div>

---
> By Amar Kota - [Hire me](https://amarkota.com/resume)

Revenut is being created as an open source alternative to [Stripe's mobile app](https://support.stripe.com/questions/stripe-iphone-and-android-mobile-apps-mobile-dashboard-app-for-standard-direct-users) after my SaaS[^1] experienced fraudulent activity in the form of [card testing](https://stripe.com/docs/disputes/prevention/card-testing). Many other Stripe customers have voiced their problems with card testing too[^2][^3] and although Stripe confirmed card testing has ceased on my website, the problem persists where fraudulent transactions and customers are still included in Stripe's mobile app reporting. As a result, the numbers and charts displayed simply do not reflect actuals. 

Unfortunately Stripe is unable to [modify the revenue data or financial reports on the dashboard at this point](docs/assets/Revenut-Screenshot-Stripe-Email.png) so the Stripe mobile app, as convenient and fast as it is, does not accurately display metrics including `Gross Volume` and `New Customers`. 

I looked into using another SaaS analytics service but they all charge a premium amount and still do not provide some of the metrics I find useful for my freemium business model. I then decided to build Revenut and open-source it so fellow SaaS owners can get accurate and transparent SaaS metrics conveniently at no cost.

|  Stripe        |  Revenut       |
|     :---:      |     :---:      |
| [<img alt="Screenshot Stripe Mobile App" src="docs/assets/Revenut-Screenshot-Stripe-Mobile.png" width="50%" alt="Stripe Mobile App" />](docs/assets/Revenut-Screenshot-Stripe-Mobile.png) | [<img src="docs/assets/Revenut-Screenshot-Dashboard.png" width="50%" alt="Revenut Mobile App" />](docs/assets/Revenut-Screenshot-Dashboard.png)     |


#  ❔ Use Case
SaaS owners who offer free trials on their products and have recurring revenue in monthly, annual or other scheduled installments. 


#  ✨ Features
- Exclude disputed and refunded transactions for accurate revenue reporting
- Login with existing Stripe username/password
- Calculates unrealized ("paper") revenue based on the number of customers trialing your product
- Calculates unrealized revenue for existing customers that are scheduled to pay their upcoming invoice
- Calculates realized revenue for customers who paid their invoice
- Logging out revokes access from Revenut


#  💻 Built With
- [`FastAPI`](https://fastapi.tiangolo.com/) `Python`
- [`Expo`](https://expo.dev) `React Native + Typescript`
- [`Victory`](https://formidable.com/open-source/victory/)
- [`NativeBase`](https://nativebase.io/)
- [`MyBrandNewLogo`](https://mybrandnewlogo.com/)
- [`Namelix`](https://namelix.com)
- [`MockuPhone`](https://mockuphone.com/)


#  🏃 Workflow
```mermaid
sequenceDiagram
    autonumber
    actor SaaS Owner
    SaaS Owner->>Revenut App: iOS / Android / Web
    activate Revenut App
    rect rgb(248, 239, 237)
      Note over Revenut App,Stripe Connect: One-Time Authorization
      critical whitelist
        activate Stripe Connect
        Revenut App->>Stripe Connect: Login with Stripe
        Stripe Connect-->>Revenut App: [authorization_code]
        deactivate Stripe Connect
      end
      activate Revenut API
      Revenut App->>Revenut API: [authorization_code]
      activate Stripe API
      Note over Revenut API, Stripe Connect: One-Time Authentication
      Revenut API->>Stripe Connect: Request access token
      Stripe Connect-->>Revenut API: [stripe_user_id]
    end
    par multiprocess async
      Revenut API-)Stripe API: /charges
      Revenut API-)Stripe API: /subscriptions
      Revenut API-)Stripe API: /customers
      Revenut API-)Stripe API: /account
    end
    Stripe API-->>Revenut API: Stripe API responses
    deactivate Stripe API
    Note over Revenut API: Calculate Metrics 
    Revenut API-->>Revenut App: Return SaaS metrics + [stripe_user_id]
    deactivate Revenut API
    Note over Revenut App: Save [stripe_user_id] to local storage
    Revenut App--xSaaS Owner: Display SaaS metrics
    deactivate Revenut App
```


#  🚦 Authentication
Revenut uses Expo's built-in [Authentication package](https://docs.expo.dev/develop/authentication/) that has been configured to use [Stripe's browser-based authentication via OAuth](https://stripe.com/docs/connect/oauth-reference). This allows Stripe users to login with their existing Stripe credentials securely so Revenut can retrieve data required to formulate its metrics.
<p align="center"><img src="docs/assets/Revenut-Screenshot-Stripe-Login.png" width="25%" alt="Revenut Authentication" /></p>


#  🙋 Challenges
The metrics Revenut displays requires retrieving two months of charges (for month-to-date and month-over-month comparisons) using Stripe's API, which can result in long loading times because: 

> ...listing charges (or most resources) can be quite slow as you need to render many objects. The Charge API especially is quite a large object to render and paginate through.

Source: [https://github.com/stripe/stripe-dotnet/issues/2284#issuecomment-777192698](https://github.com/stripe/stripe-dotnet/issues/2284#issuecomment-777192698)
<p align="center"><img src="docs/assets/Revenut-Screenshot-Loading.png" width="25%" alt="Revenut Loading" /></p>


#  👪 Contributing
If you like Revenut, **please star this repo**. If you want to make Revenut better, feel free to submit a PR, log an issue or [contact me](https://amarkota.com/contact) directly.


#  🔖 License
The Revenut source code is made available under the [**Apache 2.0 license**](LICENSE).


#  🙌 Acknowledgements
- [https://stripe.com/docs/api](https://stripe.com/docs/api)


[^1]: https://Last10K.com
[^2]: https://news.ycombinator.com/item?id=36197024
[^3]: https://news.ycombinator.com/item?id=35682534
