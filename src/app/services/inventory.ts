import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Inventory {
  readonly products: Product[] = [
    {
      id: 'cookie-assorted-tin',
      label: 'Assorted Cookie Tin',
      description:
        'A dozen bakery favorites tucked into a giftable tin. Crisp edges, chewy centers, and a parade of flavors keep things exciting. It’s the luxe way to say “I brought dessert.” Pair it with coffee, tea, or a midnight snack moment.',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/CookieUpdate2025_12Assorted_0969_995773d1-5464-4254-8590-122b9cfff3c6.jpg?format=pjpg&v=1740416234&width=700',
      price: 28,
    },
    {
      id: 'cookie-classics-assorted-tin',
      label: 'Cookie Classics Assorted Tin',
      description:
        'The classics, dressed up and ready to charm. Buttery, golden, and just the right amount of indulgent. Perfect for hosting, gifting, or a quiet moment of sweet luxury. A timeless crowd-pleaser that feels delightfully premium.',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/CookieUpdate2025_6ctAssorted_0925.jpg?format=pjpg&v=1768346791&width=540',
      price: 28,
    },
    // CAKES
    {
      id: 'birthday-cake',
      label: 'Birthday Cake',
      description:
        'Vanilla cake with birthday crumbs and fluffy frosting, party-ready every day. Each slice tastes like candles, confetti, and a wish come true. Treat yourself like it’s your big day. Chill it slightly for the dreamiest, frosted bite.',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/BirthdayCake_2023_0011.jpg?format=pjpg&v=1689691374&width=600',
      price: 65,
    },
    {
      id: 'quadruple-chocolate-cake-duo',
      label: 'Quadruple Chocolate Cake Duo',
      description:
        'Four layers of chocolate intensity, two cakes of pure decadence. Deep cocoa, silky frosting, and a melt-in-your-mouth finish. Ideal for sharing—though you may not want to. Pair it with a bold espresso or cold milk for peak indulgence.',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/Q3Humans_009.jpg?format=pjpg&v=1725917881&width=600',
      price: 105,
    },
    {
      id: 'red-velvet-cheesecake-cake',
      label: 'Red Velvet Cheesecake Cake',
      description:
        'Velvety red cake meets creamy cheesecake in a glamorous stack. Tangy, rich, and impossibly smooth. It’s a showstopper made for dessert lovers. Slice it thick for maximum wow-factor.',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/Q12026__0061_1_copy.jpg?format=pjpg&v=1767201533&width=540',
      price: 65,
    },
    //
    {
      id: 'birthday-truffle-dozen-box',
      label: 'Birthday Truffle Dozen Box',
      description:
        'Bite-size birthday cake truffles, twelve little celebrations. Soft, sweet, and dipped for extra indulgence. The kind of gift that never makes it to the party. Pop one and the celebration starts instantly.',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/products/BMBackgroundRemoval_02921_13.png?format=pjpg&v=1747414247&width=600',
      price: 40,
    },
    {
      id: 'red-velvet-cheesecake-cake-truffle-dozen-box',
      label: 'Red Velvet Cheesecake Cake Truffle Dozen Box',
      description:
        "Each over-the-top bite of our Red Velvet Cheesecake Cake Truffles is filled with chocolate cake, chocolate chips, cream cheese, and coated in barely-there chocolate shell and rolled in red velvet crumbs. This dozen pack includes a special gift wrap for Valentine's Day. Decadent, dreamy, and made to impress. Save them for date night or keep every bite to yourself.",
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/Q12026__0021.jpg?format=pjpg&v=1767201533&width=600',
      price: 42,
    },
    {
      id: 'cheesecake-cookie-tin-valentines-combo',
      label: "Cheesecake & Cookie Tin Valentine's Combo",
      description:
        "Skip the reservation and dive straight into dessert. This combo delivers the fruity, salty-sweet perfection of our NEW Cereal Milk Strawberry Swirl Cheesecake alongside six of our most beloved cookies, making it the easiest way to impress your favorite food lover this Valentine’s Day. Our new Cereal Milk Strawberry Swirl Cheesecake remixed the classic cheesecake formula to bring in more flavor and more fun. Cereal crust, with cereal milk flavored dreamy cheesecake, and ribbons of ground cereal and strawberry jam. At 6 inches, it's perfect for sharing with your special someone. Consider it romance, sorted.",
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/Cheesecake2026_Arcangeli_35CEREALMILK.jpg?format=pjpg&v=1768346635&width=540',
      price: 64,
    },
    // PIES
    {
      id: 'milk-bar-pie',
      label: 'Milk Bar Pie',
      description:
        'Buttery oat crust with gooey, salted filling. The sweet-salty balance is rich, nostalgic, and totally addictive. A signature dessert that disappears fast. Serve it slightly warm for the ultimate gooey glow.',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/MilkBarPie_2023_001.jpg?format=pjpg&v=1736534291&width=540',
      price: 53,
    },
    {
      id: 'pumpkin-milk-bar-pie',
      label: 'Pumpkin Milk Bar Pie',
      description:
        'Spiced pumpkin custard baked in a buttery oat crust. Smooth, cozy, and gently sweet. Perfect for sweater-weather cravings and candlelit desserts. Add a cloud of whipped cream and you’re golden.',
      imageUrl:
        'https://milkbarstore.com/cdn/shop/files/MilkBarPumpkinPiePDP_01_1.jpg?format=pjpg&v=1763516079&width=540',
      price: 38.5,
    },
  ];

  get(id?: string) {
    if (id) {
      return this.products.find((product) => product.id === id);
    }
    return this.products;
  }
}
