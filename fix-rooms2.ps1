$enc = New-Object System.Text.UTF8Encoding($false)
$allLines = [System.IO.File]::ReadAllLines("e:\HM Constructions\hm-site\src\PlannerPage.tsx", $enc)

# Find exact index of "export default function PlannerPage"
$compStart = 0
for ($i = 0; $i -lt $allLines.Length; $i++) {
    if ($allLines[$i] -match "^export default function PlannerPage") {
        $compStart = $i
        break
    }
}
Write-Host "Component starts at index: $compStart (line $($compStart+1))"

# Lines 1-16 = import + type definition (0-indexed: 0..15)
$header = $allLines[0..15]
# Component = from export default onwards
$component = $allLines[$compStart..($allLines.Length - 1)]

$rooms = @'
const ROOMS: Room[] = [
  {
    id: "living",
    label: "Living Room",
    emoji: "🛋️",
    cover: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    pins: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80",
      "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=500&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&q=80",
      "https://images.unsplash.com/photo-1513694203030-d0ca3ab08f17?w=500&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&q=80",
      "https://images.unsplash.com/photo-1618219944342-824e40a13285?w=500&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=500&q=80",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=500&q=80",
    ],
    tip: "Indian living rooms often feature rich textures — brass accents, jali screens, and warm earthy tones.",
  },
  {
    id: "bedroom",
    label: "Bedroom",
    emoji: "🛏️",
    cover: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80",
    pins: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=500&q=80",
      "https://images.unsplash.com/photo-1609766418204-94b375e33767?w=500&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=500&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=500&q=80",
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=500&q=80",
    ],
    tip: "Warm lighting, wooden headboards, and handloom throws are signature elements of Indian bedroom design.",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    emoji: "🍳",
    cover: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    pins: [
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=500&q=80",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=500&q=80",
      "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=500&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=500&q=80",
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&q=80",
      "https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=500&q=80",
      "https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=500&q=80",
      "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=500&q=80",
    ],
    tip: "Modular kitchens with granite counters and tall storage units are the most popular choice in Indian homes.",
  },
  {
    id: "bathroom",
    label: "Bathroom",
    emoji: "🚿",
    cover: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
    pins: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=500&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80",
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=500&q=80",
      "https://images.unsplash.com/photo-1570069090972-bc78f35aefbb?w=500&q=80",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&q=80",
      "https://images.unsplash.com/photo-1595658658025-6e08c5f6f0a4?w=500&q=80",
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=500&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=500&q=80",
    ],
    tip: "Anti-skid tiles, concealed tank fittings, and a separate shower area make Indian bathrooms practical and elegant.",
  },
  {
    id: "dining",
    label: "Dining Room",
    emoji: "🍽️",
    cover: "https://images.unsplash.com/photo-1617104678098-de229db51175?w=600&q=80",
    pins: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=500&q=80",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=500&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=500&q=80",
      "https://images.unsplash.com/photo-1615874969816-f9c1eebbd2e2?w=500&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&q=80",
    ],
    tip: "A 6-seater wooden dining set with a pendant light above is the most loved Indian family dining setup.",
  },
  {
    id: "kids",
    label: "Kids Room",
    emoji: "🧸",
    cover: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80",
    pins: [
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=500&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80",
      "https://images.unsplash.com/photo-1576505461634-9ee04dd25e7d?w=500&q=80",
      "https://images.unsplash.com/photo-1594968973184-9040a5a79963?w=500&q=80",
      "https://images.unsplash.com/photo-1544030100-abe1f7bf7bfc?w=500&q=80",
      "https://images.unsplash.com/photo-1545239705-1564e58b9e4e?w=500&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=500&q=80",
      "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=500&q=80",
    ],
    tip: "Bunk beds with a study table below, pastel walls, and lots of storage — a classic Indian kids room layout.",
  },
  {
    id: "pooja",
    label: "Pooja Room",
    emoji: "🪔",
    cover: "https://images.unsplash.com/photo-1545240994-3877e4b9f2ce?w=600&q=80",
    pins: [
      "https://images.unsplash.com/photo-1605289355680-75fb41239154?w=500&q=80",
      "https://images.unsplash.com/photo-1543946207-39bd91e70ca7?w=500&q=80",
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=500&q=80",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80",
      "https://images.unsplash.com/photo-1627483262769-04d0a1401487?w=500&q=80",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=500&q=80",
      "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=500&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=500&q=80",
      "https://images.unsplash.com/photo-1543353071-873256784f7e?w=500&q=80",
    ],
    tip: "Marble or wood mandir units with backlit jaali panels and brass diyas are the heart of every Indian home.",
  },
  {
    id: "study",
    label: "Study / Home Office",
    emoji: "📚",
    cover: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    pins: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80",
      "https://images.unsplash.com/photo-1588776814546-1ffedda8b09d?w=500&q=80",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&q=80",
      "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=500&q=80",
      "https://images.unsplash.com/photo-1562564055-71e051d33c19?w=500&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=500&q=80",
      "https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=500&q=80",
    ],
    tip: "A built-in bookshelf wall, warm desk lamp, and ergonomic chair — the ideal Indian home study setup.",
  },
  {
    id: "balcony",
    label: "Balcony",
    emoji: "🌿",
    cover: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
    pins: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&q=80",
      "https://images.unsplash.com/photo-1519710165935-8a6b6da28c1e?w=500&q=80",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80",
      "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=500&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&q=80",
      "https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?w=500&q=80",
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=500&q=80",
      "https://images.unsplash.com/photo-1556710808-f2a4c3be5db5?w=500&q=80",
    ],
    tip: "Vertical gardens, terracotta pots, and a small cane seating set transform any Indian balcony into a retreat.",
  },
  {
    id: "exterior",
    label: "Home Exterior",
    emoji: "🏠",
    cover: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    pins: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&q=80",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&q=80",
      "https://images.unsplash.com/photo-1625602812206-5ec545ca1231?w=500&q=80",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&q=80",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=500&q=80",
    ],
    tip: "Stone cladding, double-height entrance foyers, and a covered porch are hallmarks of South Indian home exteriors.",
  },
];
'@

$combined = ($header -join "`n") + "`n`n" + $rooms + "`n" + ($component -join "`n") + "`n"
[System.IO.File]::WriteAllText("e:\HM Constructions\hm-site\src\PlannerPage.tsx", $combined, $enc)
Write-Host "Done. Lines: $((Get-Content 'e:\HM Constructions\hm-site\src\PlannerPage.tsx').Count)"
