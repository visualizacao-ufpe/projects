var request = require('request'); // "request" library
var jsonfile = require('jsonfile') // "jsonfile" library
jsonfile.spaces = 2; // setting JSON file identation
var position = 95;
var rayana = "./Projeto/json/tracksAudioFeatures"+position +".json";
var readJsonPath = "./Projeto/json/Base_20_musicas_7_11.json" // setting JSON load file path
var writeJsonPath = rayana; // setting JSON write file path

var client_id = 'dc13fba2787b4e0cb75e5e1ab8ce02c1'; // Your client id
var client_secret = 'ebb24dac379746d7a1fa4d9aaf27702e'; // Your secret

var artists = [
    {
      "name": "The Beatles",
      "id": "3WrFJ7ztbogyGnTHbHJFl2",
      "Musics": [
        {
          "name": "A Day In The Life - Remastered 2009",
          "id": "3ZFBeIyP41HhnALjxWy1pR"
        },
        {
          "name": "A Hard Day's Night - Remastered 2009",
          "id": "69d54YOS8TOQiUYjX57XeA"
        },
        {
          "name": "Across The Universe - Remastered 2009",
          "id": "72Ob0wrObCXgvGYhFs8vip"
        },
        {
          "name": "All My Loving - Remastered 2009",
          "id": "7cPPyMrSAQY7A686Cn9eUP"
        },
        {
          "name": "All You Need Is Love - Remastered 2009",
          "id": "3xMSaDC9TU6AQJIsxQB7MK"
        },
        {
          "name": "Blackbird - Remastered 2009",
          "id": "4Z92RMiyJpUrApZi3LtpJ6"
        },
        {
          "name": "Can't Buy Me Love - Remastered 2015",
          "id": "7pQAq14Z73YUFMtxCyt0bG"
        },
        {
          "name": "Come Together - Remastered 2009",
          "id": "0MKqeOVdZcUFGJvWpGCKbG"
        },
        {
          "name": "Day Tripper - Remastered 2015",
          "id": "0vXGSlE4ft3n5JHZMHHSIj"
        },
        {
          "name": "Eight Days A Week - Remastered 2015",
          "id": "3nhJDVdUrm6DnDW4iBfpKz"
        },
        {
          "name": "Eleanor Rigby - Remastered 2009",
          "id": "77f3aNeabAbOaSB32Sd5QE"
        },
        {
          "name": "Get Back - Remastered 2009",
          "id": "3JzL2n8ofVRV6pZXAMGQ93"
        },
        {
          "name": "Hello, Goodbye - Remastered 2015",
          "id": "0wFW5NQJdNDJPcZyfYSExx"
        },
        {
          "name": "Help! - Remastered 2009",
          "id": "5ou2BiQ9FxIYkxsYvYHpAT"
        },
        {
          "name": "Here Comes The Sun - Remastered 2009",
          "id": "45yEy5WJywhJ3sDI28ajTm"
        },
        {
          "name": "Here, There And Everywhere - Remastered 2009",
          "id": "1dCGa0fzXpCWvQbpuoe28D"
        },
        {
          "name": "Hey Jude - Remastered 2015",
          "id": "3H7sv3Krffn15BufUuXzf3"
        },
        {
          "name": "I Feel Fine - Remastered 2015",
          "id": "0Gm34HBxrXlaAf1jdJMjx2"
        },
        {
          "name": "I Saw Her Standing There - Remastered 2009",
          "id": "63nTBScSLXWwyeizXi9Rmi"
        },
        {
          "name": "I Want To Hold Your Hand - Remastered 2015",
          "id": "4DRBaZ760gyk7LWnaJFqsJ"
        }
      ],
      "position": 1
    },
    {
      "name": "Bob Dylan",
      "id": "74ASZWbe4lXaubB36ztrGX",
      "Musics": [
        {
          "name": "A Hard Rain's A-Gonna Fall",
          "id": "7ny2ATvjtKszCpLpfsGnVQ"
        },
        {
          "name": "All Along the Watchtower",
          "id": "0Fnb2pfBfu0ka33d6Yki17"
        },
        {
          "name": "Autumn Leaves",
          "id": "3tKCYhzgnMEExDtetcZknP"
        },
        {
          "name": "Ballad of a Thin Man",
          "id": "0f5N14nB8xi0p3o4BlVvbx"
        },
        {
          "name": "Blind Willie McTell",
          "id": "1pJdqFpw52UQpItDRMoca3"
        },
        {
          "name": "Blowin' In the Wind",
          "id": "18GiV1BaXzPVYpp9rmOg0E"
        },
        {
          "name": "Changing of the Guards - Remastered",
          "id": "2vVpjZxlSiqR5wr2YeZPB2"
        },
        {
          "name": "Desolation Row",
          "id": "4n1ZGm3TxYmoYe1YR8cMus"
        },
        {
          "name": "Don't Think Twice, It's All Right",
          "id": "2WOjLF83vqjit2Zh4B69V3"
        },
        {
          "name": "Forever Young - Slow Version",
          "id": "4yWl0tnEanf3zmZzl9kbQn"
        },
        {
          "name": "Full Moon And Empty Arms",
          "id": "69D9nydAqGyu7l10RyheyU"
        },
        {
          "name": "Girl from the North Country",
          "id": "739sLmfUkVFoyPtb0C3263"
        },
        {
          "name": "Highway 61 Revisited",
          "id": "6os5B6xjuke9YfBKH3tu1e"
        },
        {
          "name": "Hurricane",
          "id": "1lqMLr9Wj7SM2F9AikGcxN"
        },
        {
          "name": "I Shall be Released - Take 1",
          "id": "0gEMdjLNCMiMla2Auz43iL"
        },
        {
          "name": "I Want You",
          "id": "7tJQ4Ekp2vN3NlI3vJJW3v"
        },
        {
          "name": "I'm A Fool To Want You",
          "id": "6PQ30208LWUAx5R5cYeIJ6"
        },
        {
          "name": "It Ain't Me Babe",
          "id": "5nbNWAfT1S6V1vqj3snHxS"
        },
        {
          "name": "It's All over Now, Baby Blue",
          "id": "4EgKcG7aswxVfQEqa3dl8S"
        },
        {
          "name": "It's Alright, Ma (I'm Only Bleeding)",
          "id": "5Oer8yskMaCGXwGSfM7xr9"
        }
      ],
      "position": 2
    },
    {
      "name": "Elvis Presley",
      "id": "43ZHCT0cAZBISjO8DG9PnE",
      "Musics": [
        {
          "name": "(You're The) Devil in Disguise",
          "id": "0D1pEisM3QkiacGXJe5dmd"
        },
        {
          "name": "A Big Hunk o' Love",
          "id": "2Bp3uPsOHLRiz3BDxCSiYs"
        },
        {
          "name": "A Little Less Conversation - JXL Radio Edit Remix",
          "id": "4l2hnfUx0esSbITQa7iJt0"
        },
        {
          "name": "Always On My Mind",
          "id": "7ymViyGjO39XBm5KHYR6vF"
        },
        {
          "name": "Amazing Grace",
          "id": "5wHPDLc6B5jl9z9ewCIybi"
        },
        {
          "name": "An American Trilogy",
          "id": "02j4BAJcS1nikK36dJjKtC"
        },
        {
          "name": "And the Grass Won't Pay No Mind",
          "id": "0UCYEvcn0EFKwbDGMDFklA"
        },
        {
          "name": "Blue Suede Shoes",
          "id": "47gmoUrZV3w20JAnQOZMcO"
        },
        {
          "name": "Bridge Over Troubled Water",
          "id": "3WGAxqtV8CjYVlDHIrUtwq"
        },
        {
          "name": "Burning Love",
          "id": "4VK3MDt1FAP101D0mnFJkz"
        },
        {
          "name": "Can't Help Falling In Love",
          "id": "6sE53f6saWW6AwB5V8Z47U"
        },
        {
          "name": "Don't Be Cruel",
          "id": "4zzXm1QJQXWLyUfFhWZBRg"
        },
        {
          "name": "Fever",
          "id": "3OdIvw0Vb10FvCI9GnOIjg"
        },
        {
          "name": "Heartbreak Hotel",
          "id": "6xNwKNYZcvgV3XTIwsgNio"
        },
        {
          "name": "Hound Dog",
          "id": "0JOw67rq2X6NDz5AJP9uIG"
        },
        {
          "name": "How Great Thou Art",
          "id": "6j8nbNwba5XKWXpM2pL8yZ"
        },
        {
          "name": "If I Can Dream",
          "id": "6G4TSiKFcvAeATpXsJrrUw"
        },
        {
          "name": "In the Ghetto",
          "id": "6csLL0MBNVIMx19PfsKsW7"
        },
        {
          "name": "It's Now or Never",
          "id": "72r64zuD868n6mQhC8Tp56"
        },
        {
          "name": "Jailhouse Rock",
          "id": "4gphxUgq0JSFv2BCLhNDiE"
        }
      ],
      "position": 3
    },
    {
      "name": "The Rolling Stones",
      "id": "22bE4uQ6baNwSHPVcDxLCe",
      "Musics": [
        {
          "name": "(I Can't Get No) Satisfaction - (Original Single Mono Version)",
          "id": "57J2znxukXsXzS3XPuZ1TG"
        },
        {
          "name": "2000 Man",
          "id": "4OegwIs19XU8f9ChR0y2uL"
        },
        {
          "name": "Angie",
          "id": "0Bj15uTA1d1itAneIuIo0n"
        },
        {
          "name": "Anybody Seen My Baby? - 2009 Digital Remaster",
          "id": "6TEUwkJ3zLMKUSTnUAO1GY"
        },
        {
          "name": "Beast Of Burden",
          "id": "5AoI7pfHdl87BQ93rKZXk9"
        },
        {
          "name": "Brown Sugar - Remastered",
          "id": "6Gi8vIT6In8RrT2eTKxoVR"
        },
        {
          "name": "Can't You Hear Me Knocking - Remastered",
          "id": "7HRKgCruDphRaLW4wmx8xM"
        },
        {
          "name": "Dead Flowers - Remastered",
          "id": "0MylYDkfgKH9Cx32uzWBll"
        },
        {
          "name": "Doom And Gloom - Jeff Bhasker Mix",
          "id": "3GqBziKS5dV16Rt7XBhry7"
        },
        {
          "name": "Gimme Shelter",
          "id": "1dv3ePjze9tPq2pk8eWJdR"
        },
        {
          "name": "Hate To See You Go",
          "id": "1PC9v4dwsZrWT4n5Mzry9q"
        },
        {
          "name": "Honky Tonk Women - Mono Version",
          "id": "5RvlXvjhyegbWQDx3zkGYs"
        },
        {
          "name": "It's Only Rock'n'Roll (But I Like It) - 2009 Re-Mastered Digital Version",
          "id": "0DAeKfJBiLBUVyNJdpz2lH"
        },
        {
          "name": "Jumpin' Jack Flash",
          "id": "269rUyj7DapVabdn6Fuz2M"
        },
        {
          "name": "Just Your Fool",
          "id": "3ewICMKLmXyEHfqh7yyqTe"
        },
        {
          "name": "Let It Bleed",
          "id": "73d5kMQtyS8RhbVxElFZE6"
        },
        {
          "name": "Like A Rolling Stone - Edit",
          "id": "7JPQnsEfbXDNf1fo4djmZF"
        },
        {
          "name": "Love Is Strong - 2009 Re-Mastered Digital Version",
          "id": "1FMQd25wsXU14lg323zyNa"
        },
        {
          "name": "Miss You",
          "id": "1ry2PK9F2CztuMg1edcVXl"
        },
        {
          "name": "Mother's Little Helper",
          "id": "11hh5p0fDdOmu8NPYa15iK"
        }
      ],
      "position": 4
    },
    {
      "name": "Chuck Berry",
      "id": "293zczrfYafIItmnmM3coR",
      "Musics": [
        {
          "name": "All Aboard",
          "id": "5Qf6tG8IT9rj3fmVFJvzdU"
        },
        {
          "name": "Back In The U.S.A. - Single Version",
          "id": "3qL3VDpEaFxV8258IiLPJ6"
        },
        {
          "name": "Brown Eyed Handsome Man",
          "id": "2iBM7XvFItUTs69cjYXW9c"
        },
        {
          "name": "Carol - Single Version",
          "id": "4JpVHZxtPOivhLpgCLKuG2"
        },
        {
          "name": "Confessin' The Blues",
          "id": "7n8D7SxAWYqXrXUMOZ5A5N"
        },
        {
          "name": "Deep Feeling",
          "id": "1aJfjN37zLAoGvKjjmTBvk"
        },
        {
          "name": "Down The Road Apiece",
          "id": "4DvrxstE3vGOgESU6Nseld"
        },
        {
          "name": "Driftin' Blues",
          "id": "49Giz0oNvCMWy6YvCVgxoo"
        },
        {
          "name": "Gun - Instrumental",
          "id": "6IlfWfc7AQ7I9goFJXOLSc"
        },
        {
          "name": "Have Mercy Judge",
          "id": "0ATtDq3DveQUaBamRFxeWJ"
        },
        {
          "name": "House Of Blue Lights",
          "id": "0ZGMv2Gx4gT6hZxPp70jlD"
        },
        {
          "name": "How You've Changed",
          "id": "78CLHh44CXNEltxgZ0bX3H"
        },
        {
          "name": "I Just Want To Make Love To You",
          "id": "5Z0LNCcggDyZqR2PKgonD1"
        },
        {
          "name": "I'm A Rocker",
          "id": "4crIzSsL5VnVNsvH0onRDW"
        },
        {
          "name": "Instrumental",
          "id": "77UeQnXhRfIN7eLyrQJQmT"
        },
        {
          "name": "Johnny B. Goode",
          "id": "4GHF75LwRT2Hsv9z3ZXpM8"
        },
        {
          "name": "Let It Rock - Single Version",
          "id": "3vSvZP08QFAb58Ge3ApK6Z"
        },
        {
          "name": "Little Queenie - Single Version",
          "id": "6v1Nj1mFpgeNb1w78iiiYU"
        },
        {
          "name": "Maybellene - Single Version",
          "id": "3xl7hbVVRhdej6ZuypMmW9"
        },
        {
          "name": "Memphis, Tennessee - Single Version",
          "id": "0F3RFAD3gmx5Wpj1WIYj1e"
        }
      ],
      "position": 5
    },
    {
      "name": "Jimi Hendrix",
      "id": "776Uo845nYHJpNaStv1Ds4",
      "Musics": [
        {
          "name": "All Along the Watchtower",
          "id": "2aoo2jlRnM3A0NyLQqMN2f"
        },
        {
          "name": "Angel",
          "id": "2I14CRglrAX93shSeSjYzM"
        },
        {
          "name": "Bold as Love",
          "id": "0uco0wQkB909zpPlHvu5Cc"
        },
        {
          "name": "Born Under a Bad Sign",
          "id": "1HbOlAS9kF9d5j7WNQbin9"
        },
        {
          "name": "Castles Made of Sand",
          "id": "67J8yUyGgdq6tqethoVz7O"
        },
        {
          "name": "Changes - Live at the Fillmore East",
          "id": "5SHzWHkue201WzzjkrXygn"
        },
        {
          "name": "Crosstown Traffic",
          "id": "1ntxpzIUbSsizvuAy6lTYY"
        },
        {
          "name": "Earth Blues",
          "id": "7aAholeRCIGZD1QhHYKDDq"
        },
        {
          "name": "Fire",
          "id": "5LI7PoHEolR8plrf3I16sq"
        },
        {
          "name": "Foxey Lady",
          "id": "23MrkN7g6Q5U7GLIxNHN1B"
        },
        {
          "name": "Freedom",
          "id": "494aMHJOpaMyyxaqcmbjLi"
        },
        {
          "name": "Have You Ever Been (To Electric Ladyland)",
          "id": "3Yh64aiu2ANBwDFztyPDkT"
        },
        {
          "name": "Hear My Train a Comin'",
          "id": "4DmBVImaIhE3RyNvbtZTTz"
        },
        {
          "name": "Hey Joe",
          "id": "3VMMmMR4IYL28n7oKHyUoD"
        },
        {
          "name": "If 6 Was 9",
          "id": "0J3CHAStO3pNGTnYnxKZod"
        },
        {
          "name": "Izabella - Live at the Fillmore East",
          "id": "3NSVTmtMgwTpux4pyFgQxQ"
        },
        {
          "name": "Like A Rolling Stone - Live At Monterey",
          "id": "2y84zRlD8OD6wYpxUylgTV"
        },
        {
          "name": "Little Wing",
          "id": "1Eolhana7nKHYpcYpdVcT5"
        },
        {
          "name": "Lover Man - Live at the Fillmore East",
          "id": "2jN6QknvlgFCvitZNpyk7X"
        },
        {
          "name": "Machine Gun - Live at the Fillmore East",
          "id": "7qRyhseyLxQ8ukR1bLyAz9"
        }
      ],
      "position": 6
    },
    {
      "name": "James Brown",
      "id": "7GaxyUddsPok8BuhxN6OUW",
      "Musics": [
        {
          "name": "Ain't It Funky Now - (Part 1)",
          "id": "2z28D9KSgZjpTvFUKt3fmg"
        },
        {
          "name": "Caldonia",
          "id": "4bS3SLxIyo6ovK3xDHA3TD"
        },
        {
          "name": "Cold Sweat",
          "id": "7Aroy5dZs3mY2cFEWexlcG"
        },
        {
          "name": "Funky President (People It's Bad)",
          "id": "42k9p5DG5DEDJwAVU8PWVt"
        },
        {
          "name": "Get Up (I Feel Like Being A) Sex Machine",
          "id": "1qvY84PQZYJ6ZLhQ9DEl2R"
        },
        {
          "name": "Get Up I Feel Like Being A Sex Machine - Pt. 1 / Single Version",
          "id": "6347DQMRr3cSZ7gio3R2MH"
        },
        {
          "name": "Get Up Offa That Thing",
          "id": "54BPjpdALecJ7qeKkM2g2P"
        },
        {
          "name": "I Can't Stand Myself (When You Touch Me) - Live At Memorial Auditorium, Dallas/1968",
          "id": "61HstKhi3eg8WZK2sXkIss"
        },
        {
          "name": "I Got The Feelin'",
          "id": "0HDh8zNFSAXIvy9cB962Qs"
        },
        {
          "name": "I Got You (I Feel Good)",
          "id": "3ASrlku9X40moDdtdoPDqb"
        },
        {
          "name": "I'm Real",
          "id": "6DzXw0IEY1ErHfiVagW33j"
        },
        {
          "name": "It's A Man's Man's Man's World - Live In Tampa, FL/1966",
          "id": "5seyNYWtRpydaGgHIefKdd"
        },
        {
          "name": "It's A Man's, Man's, Man's World",
          "id": "5BLBpcQLF54Lxg3ufn1GCT"
        },
        {
          "name": "It's Too Funky In Here",
          "id": "4A3gZDx4RIm6lFwTvPiiNW"
        },
        {
          "name": "Living In America",
          "id": "4Y5yjzs9FFw5qIgfZBd43I"
        },
        {
          "name": "Make It Funky - Pt. 1",
          "id": "62Dp83i4yUw0WA10hEa5GJ"
        },
        {
          "name": "Mind Power",
          "id": "3iJ0vO8FXLHPO9p99j4ngG"
        },
        {
          "name": "Mother Popcorn - Part 1",
          "id": "0Wboa64SwEEWLrAiYnYiWG"
        },
        {
          "name": "Night Train - Live At The Apollo Theater/1962",
          "id": "3iMZ46mi9igqXg0n7V6A62"
        },
        {
          "name": "Out Of Sight",
          "id": "7tt9J3ha3ONbMf8DTipRqe"
        }
      ],
      "position": 7
    },
    {
      "name": "Little Richard",
      "id": "4xls23Ye9WR9yy3yYMpAMm",
      "Musics": [
        {
          "name": "All Around The World",
          "id": "4QbDhkxYV1Qtezq8Ly0vnI"
        },
        {
          "name": "Baby",
          "id": "04DHVW3KQCNLu2JO5hJvaw"
        },
        {
          "name": "Bama Lama Bama Loo",
          "id": "0am30BDRuUNnpKldsEjRXk"
        },
        {
          "name": "Born on the Bayou",
          "id": "44HZxlz4qspKAIu0dKOuJs"
        },
        {
          "name": "Burning up with Love",
          "id": "5NtoCJcZaaemo0gkY5w6R1"
        },
        {
          "name": "By The Light Of The Silvery Moon",
          "id": "6mFJ55WgoEfSxAnDL29eDD"
        },
        {
          "name": "California (I'm Comin')",
          "id": "2wG0e58UvkiYqIroFHD5If"
        },
        {
          "name": "Can't Believe You Wanna Leave",
          "id": "7BkkwFjreJxJWi3yOlPkVe"
        },
        {
          "name": "Dancing in the Street",
          "id": "7lseFrLw5J3zAjfEKVrjHL"
        },
        {
          "name": "Get Down with It",
          "id": "63VN1yQ8RcKMUVX4KMRsBy"
        },
        {
          "name": "Good Golly Miss Molly",
          "id": "1fMMRoalpb7E8m5FsAta2y"
        },
        {
          "name": "Green Power",
          "id": "4DbCtitUs55VaSVy49A3BP"
        },
        {
          "name": "Heeby-Jeebies",
          "id": "0AX4buPcNRSbvtZEPMjDzO"
        },
        {
          "name": "Hound Dog (Rehearsal Take)",
          "id": "6erg6t9b3BvKGx77OPflXv"
        },
        {
          "name": "It Ain't What You Do, It's the Way How You Do It",
          "id": "1ipBc9x8NPlqtFyZFlxl1w"
        },
        {
          "name": "Jenny Jenny",
          "id": "2W3i3DEeU2413UmCNJgS2V"
        },
        {
          "name": "Keep A Knockin'",
          "id": "5dBe1l41ykdbfg2r1z1BoD"
        },
        {
          "name": "Long Tall Sally",
          "id": "2uu41WgPPwOvsILlKH5S5n"
        },
        {
          "name": "Long Tall Sally / Shake Rattle and Roll",
          "id": "1cUQgLSVM0QELwtPPPHWKS"
        },
        {
          "name": "Lucille",
          "id": "5RZnjbKXWjI53FYc24tx5G"
        }
      ],
      "position": 8
    },
    {
      "name": "Aretha Franklin",
      "id": "7nwUJBm0HE4ZxD3f5cy5ok",
      "Musics": [
        {
          "name": "(You Make Me Feel Like) A Natural Woman",
          "id": "29N4xnL6SpjkQiuPaTvQXA"
        },
        {
          "name": "A Change Is Gonna Come",
          "id": "4jeEaCq9omzcX5cOFKhT5O"
        },
        {
          "name": "Ain't No Way",
          "id": "3BucMqBqIR5Aw7MrUkF00y"
        },
        {
          "name": "At Last",
          "id": "5nSzvsTiu2hIYKGrDn141h"
        },
        {
          "name": "Baby, I Love You",
          "id": "36v8IF4VJv37hDMasPxX6g"
        },
        {
          "name": "Bridge Over Troubled Water",
          "id": "3MGNretkjfPdtL1YfZY34Z"
        },
        {
          "name": "Chain Of Fools",
          "id": "3tv4YPWMAjrfS8GPwXPtFA"
        },
        {
          "name": "Day Dreaming",
          "id": "7L4G39PVgMfaeHRyi1ML7y"
        },
        {
          "name": "Do Right Woman, Do Right Man",
          "id": "6uAEJQpAPoYmM6Mb0tJN2I"
        },
        {
          "name": "Drown in My Own Tears",
          "id": "0jagROPNGlbn5t7F1M1FvP"
        },
        {
          "name": "Freeway of Love",
          "id": "5VsAiXtW0ApEaGsZypEUxL"
        },
        {
          "name": "How Do You Keep The Music Playing",
          "id": "4LTa2DALHWoAvFKQwsRugj"
        },
        {
          "name": "I Knew You Were Waiting (For Me)",
          "id": "0f6pHbsLzpWxl5CfhOUjBA"
        },
        {
          "name": "I Never Loved A Man (The Way I Love You)",
          "id": "0B9Ie2wsV8mJMgAnZirIbQ"
        },
        {
          "name": "I Say A Little Prayer",
          "id": "7haFcQaoTBr2qY6G0r4JSH"
        },
        {
          "name": "I Will Survive (The Aretha Version)",
          "id": "44CUaeAUvLLgCqslAx1GmU"
        },
        {
          "name": "I'm Every Woman / Respect",
          "id": "5NUUMjnvKiw0mSLQd5vRA6"
        },
        {
          "name": "Midnight Train To Georgia",
          "id": "34e1mfaKrX6Z1HiusQM3lf"
        },
        {
          "name": "Moon River - Remastered",
          "id": "2ymtLLDnyWlDb6CeZgDCiF"
        },
        {
          "name": "No One",
          "id": "5yZpdbnmVwNm0IvWQXvBQl"
        }
      ],
      "position": 9
    },
    {
      "name": "Ray Charles",
      "id": "1eYhYunlNJlDoQhtYBvPsi",
      "Musics": [
        {
          "name": "A Fool For You",
          "id": "7uMb8RUN7S0bXdWXpI2euL"
        },
        {
          "name": "A Song For You",
          "id": "3013Mn0rcDzgrDBv7j3Eje"
        },
        {
          "name": "Ain't That Love",
          "id": "7iqWZNpHBAK5jE6e9gPKj9"
        },
        {
          "name": "America The Beautiful",
          "id": "6kT2T4pofQmT4dOlg3Ki3B"
        },
        {
          "name": "Black Coffee - 2016 Mono Remastered",
          "id": "0pM0N34Q7h1gSXwA0mLf9k"
        },
        {
          "name": "Come Back Baby",
          "id": "48al0wZBGItngZQZED80WO"
        },
        {
          "name": "Come Rain Or Come Shine",
          "id": "2htH7r8oqqEwp3BB6oh2cU"
        },
        {
          "name": "Doodlin' - 2016 Mono Remastered",
          "id": "5zwt8VEdGez823yibKhwqZ"
        },
        {
          "name": "Drown In My Own Tears",
          "id": "0oQtjAjUeksVd9gHE5fl02"
        },
        {
          "name": "Fever (with Natalie Cole)",
          "id": "7JMZvdSIUDUkeKupzSF0B5"
        },
        {
          "name": "Georgia On My Mind",
          "id": "4PKRAcbN8aPrgzFe0kOxRx"
        },
        {
          "name": "Hallelujah I Love Her So",
          "id": "5P11rW6aJErF37MTfRZS31"
        },
        {
          "name": "Hard Times (No One Knows Better Than I) (R&B)",
          "id": "60Bz1S8tq02DT15F4QALWR"
        },
        {
          "name": "Here We Go Again (with Norah Jones)",
          "id": "1jKW8H81OtWvWeQG5zoxWR"
        },
        {
          "name": "Hit The Road Jack",
          "id": "7sXxvOVFtMr31xj0kX9BFV"
        },
        {
          "name": "I Can't Stop Loving You",
          "id": "2FTCUHcXNicisIq19seZ2b"
        },
        {
          "name": "I Got a Woman",
          "id": "4n3jZ9O3ntnHrP1sjmWW8T"
        },
        {
          "name": "I'm Gonna Move To The Outskirts Of Town",
          "id": "3j0MTdXcP6ttk2qhzGgdRS"
        },
        {
          "name": "I've Got A Woman",
          "id": "2xar08Fq5xra2KKZs5Bw9j"
        },
        {
          "name": "If I Could",
          "id": "18AygPxDUyLFqCmtOwRYTT"
        }
      ],
      "position": 10
    },
    {
      "name": "Bob Marley & The Wailers",
      "id": "2QsynagSdAqZj3U9HgDzjD",
      "Musics": [
        {
          "name": "Buffalo Soldier",
          "id": "4T8AdShKNGD6mZqEyLM1nz"
        },
        {
          "name": "Burnin' & Lootin' - Live At Music Hall, Boston / 1978",
          "id": "3hIo6haPuEbDuxVRSxJa8x"
        },
        {
          "name": "Could You Be Loved",
          "id": "61dXuN3VyqGOyOeMfJXIPh"
        },
        {
          "name": "Easy Skanking",
          "id": "2pHt6xVwrevUKBfu6LL5I1"
        },
        {
          "name": "Exodus",
          "id": "3FYXa4KECAGnFTk0W6YXtM"
        },
        {
          "name": "I Shot The Sheriff - Live At Music Hall, Boston / 1978",
          "id": "5hivJSlGqbVkMpu41NlIGd"
        },
        {
          "name": "Iron Lion Zion",
          "id": "4lMfYLOskpi3GxEXM0X92m"
        },
        {
          "name": "Is This Love",
          "id": "58qEQujDJy5ma0cWRnB6dh"
        },
        {
          "name": "Jamming",
          "id": "3etSM4KHZRIn5PmUvNpxbu"
        },
        {
          "name": "Kaya",
          "id": "3rWA9OuS0q8xwv0MdFPlpY"
        },
        {
          "name": "Natural Mystic - Live at the Stanley Theatre - 9/23/1980",
          "id": "49jmse1GlYSffI64zdFWFY"
        },
        {
          "name": "No Woman No Cry - Live At Music Hall, Boston / 1978",
          "id": "5gaTw8Gpt7m7mKOInNtLMw"
        },
        {
          "name": "No Woman, No Cry - Live At The Lyceum, London/1975",
          "id": "2mKsPUojh602HvSeNt04CB"
        },
        {
          "name": "One Drop",
          "id": "0lzOFW7ELjXom0Jua03stq"
        },
        {
          "name": "One Love / People Get Ready",
          "id": "05VlGC380rZvDx5suJE9sH"
        },
        {
          "name": "Pimper's Paradise",
          "id": "7GQumyB48MXYwHpqVJj8f3"
        },
        {
          "name": "Positive Vibration",
          "id": "566XGPwEtTtlgNP5SMR6io"
        },
        {
          "name": "Punky Reggae Party",
          "id": "1oEVn2wMuMcTH9HMofH150"
        },
        {
          "name": "Rebel Music - Live At Music Hall, Boston / 1978",
          "id": "0tGNfCw1BzCW6JpfFp9AOJ"
        },
        {
          "name": "Redemption Song",
          "id": "21dOjdraFZffs2lnQObaiZ"
        }
      ],
      "position": 11
    },
    {
      "name": "The Beach Boys",
      "id": "3oDbviiivRWhXwIE8hxkVV",
      "Musics": [
        {
          "name": "All I Wanna Do",
          "id": "7y9O8sJmuX7DvmyrR7h3PY"
        },
        {
          "name": "Barbara Ann",
          "id": "5tP77cig0EkPqF4jECsp6K"
        },
        {
          "name": "California Girls",
          "id": "6bJuuCtXYiwOcKT9s8uRh8"
        },
        {
          "name": "Caroline, No - 1996 Digital Remaster",
          "id": "5RSQKtG1KNwrzFMEePpjt6"
        },
        {
          "name": "Darlin'",
          "id": "4BcAcEbp6j6luowfAliUfW"
        },
        {
          "name": "Don't Talk (Put Your Head On My Shoulder) - 1996 Digital Remaster",
          "id": "6gDRRyg6bSODdwbuUBupoU"
        },
        {
          "name": "Don't Worry Baby",
          "id": "1GLmaPfulP0BrfijohQpN5"
        },
        {
          "name": "Forever",
          "id": "74D87XkpPozTefTJaGs1oH"
        },
        {
          "name": "God Only Knows - 1996 Digital Remaster",
          "id": "0ObrXLrfrqJUNc8RfmIBHP"
        },
        {
          "name": "Good Vibrations",
          "id": "6aU6a9tdn2vHhnPGlboFZX"
        },
        {
          "name": "Hang On To Your Ego",
          "id": "4ZSBGLE9j9buk6DXVSryBI"
        },
        {
          "name": "Help Me, Rhonda",
          "id": "3haZcHm3HydDVxm3je3Zmg"
        },
        {
          "name": "Here She Comes",
          "id": "0nYy99TKeqt8T2LdSWzFHN"
        },
        {
          "name": "Here Today - Digitally Remastered 96",
          "id": "3Ev5ATks540KaOFTjIH97S"
        },
        {
          "name": "Heroes and Villains",
          "id": "7BO7ZbaEmgCSSp3znPMxN4"
        },
        {
          "name": "I Get Around",
          "id": "4XXVKcnpCRRSScVm8UGGgo"
        },
        {
          "name": "I Just Wasn't Made For These Times - Digitally Remastered 96",
          "id": "4CuO8TINNqM3D7aUdNQ3zG"
        },
        {
          "name": "I Know There's An Answer - Digitally Remastered 96",
          "id": "5VsxBUyw0TRwVC7ja1CIBc"
        },
        {
          "name": "I'm Waiting For The Day - Digitally Remastered 96",
          "id": "2Bjic7K9fTNS8pYuMXq8Va"
        },
        {
          "name": "Kokomo",
          "id": "0NqQmmLEN9rlnkh2JW0UIs"
        }
      ],
      "position": 12
    },
    {
      "name": "Buddy Holly",
      "id": "3wYyutjgII8LJVVOLrGI0D",
      "Musics": [
        {
          "name": "Baby Won't You Come Out Tonight - 1983 Overdubbed Version",
          "id": "5UoM3AXOyBoWA80yzsIK7n"
        },
        {
          "name": "Blue Days, Black Nights - Single Version",
          "id": "1rUXnf9bph2fdmNtKuTpdT"
        },
        {
          "name": "Blue Suede Shoes",
          "id": "1zZq0fZrGeSGrMhffUQEPg"
        },
        {
          "name": "Bo Diddley",
          "id": "4zv2vBdIYDaHNAYRJCD1zV"
        },
        {
          "name": "Brown Eyed Handsome Man",
          "id": "39sjkZ2LRO1kUJqnwe2KPj"
        },
        {
          "name": "Changing All Those Changes - 1983 Overdubbed Version",
          "id": "3cUYkoCGItZJNDIj4znme6"
        },
        {
          "name": "Crying, Waiting, Hoping",
          "id": "2zOy5C3ebIYsanM1DRg449"
        },
        {
          "name": "Dearest",
          "id": "5yiJzl08yZM15o1UF889Hi"
        },
        {
          "name": "Don't Come Back Knockin'",
          "id": "0sOTTKk2S4XkBz13KIPH8Y"
        },
        {
          "name": "Early In The Morning",
          "id": "4qf9PAGoLA2BqGae6GHHvQ"
        },
        {
          "name": "Everyday",
          "id": "7iOvMvv59Vq3W4kL085kOL"
        },
        {
          "name": "Girl On My Mind",
          "id": "1yhB3gkEaGA7xOZ5YLzMNH"
        },
        {
          "name": "Heartbeat",
          "id": "4bP5VENAWRlPaT3OoCLiYz"
        },
        {
          "name": "I'm Gonna Love You Too",
          "id": "3l7usD1Yx6a8Mvg9C8o7P7"
        },
        {
          "name": "I'm Gonna Set My Foot Down - 1983 Overdubbed Version",
          "id": "1WrAkPppOez7qxV8guGhF4"
        },
        {
          "name": "It Doesn't Matter Anymore",
          "id": "00S7zXnfMD9JSImK37XjYd"
        },
        {
          "name": "Learning The Game",
          "id": "2mOywurIfD40JgdRKCQNJf"
        },
        {
          "name": "Listen To Me",
          "id": "09U4tIpxJZgOkNaR6UPOsd"
        },
        {
          "name": "Look At Me",
          "id": "7rweyQPNZXDShfAYBLd3IC"
        },
        {
          "name": "Love Is Strange",
          "id": "7G9STZnCP1FoYAOf07NNrz"
        }
      ],
      "position": 13
    },
    {
      "name": "Led Zeppelin",
      "id": "36QJpDe2go2KgaRleHCDTp",
      "Musics": [
        {
          "name": "All My Love",
          "id": "6lrh9jZ1xoMwoErgPSj2rY"
        },
        {
          "name": "Babe I'm Gonna Leave You",
          "id": "0ducHx1R45CnEloZ6tUVuC"
        },
        {
          "name": "Black Dog",
          "id": "0D58ERdLBDRgT86BPnH8ps"
        },
        {
          "name": "Communication Breakdown",
          "id": "6GXlXAfXR7C6u1VjR3VMsm"
        },
        {
          "name": "D'yer Mak'er",
          "id": "5iNr7y6iWNkwVvVeOXSLT5"
        },
        {
          "name": "Dazed And Confused",
          "id": "6hu1f1cXSw7OAqhpSQ2zDy"
        },
        {
          "name": "Going To California",
          "id": "55sjCMeQM26VxbNHhMtj2b"
        },
        {
          "name": "Good Times Bad Times",
          "id": "3tcaltthSz9s6awB6koVRo"
        },
        {
          "name": "Heartbreaker",
          "id": "6WE7jSshLCuVKoCmobVKVf"
        },
        {
          "name": "I Can't Quit You Baby - 23/3/69 Top Gear",
          "id": "5QRD5sNh0aaWMyjTzQ0QIn"
        },
        {
          "name": "Immigrant Song",
          "id": "6kjlvJLh2DBsSQtqVzFh8I"
        },
        {
          "name": "Kashmir",
          "id": "2nVHqZbOGkKWzlcy1aMbE7"
        },
        {
          "name": "Moby Dick",
          "id": "0h2gzJQBt6duqZD6kWiz4s"
        },
        {
          "name": "Ramble On",
          "id": "3MODES4TNtygekLl146Dxd"
        },
        {
          "name": "Rock And Roll",
          "id": "4PRGxHpCpF2yoOHYKQIEwD"
        },
        {
          "name": "Since I've Been Loving You",
          "id": "3Wunwn44wcWRNB4zb03AvA"
        },
        {
          "name": "Stairway To Heaven",
          "id": "5CQ30WqJwcep0pYcV4AMNc"
        },
        {
          "name": "Tangerine",
          "id": "3NH2FJUSV3HGXZRtOc3Uwj"
        },
        {
          "name": "The Girl I Love She Got Long Black Wavy Hair - 22/6/69 Pop Sundae",
          "id": "7ecVrUYlhj6OrKTAK0oDzo"
        },
        {
          "name": "Travelling Riverside Blues - 29/6/69 Top Gear",
          "id": "5cWIRgigrzjTjDBNXQxhAR"
        }
      ],
      "position": 14
    },
    {
      "name": "Stevie Wonder",
      "id": "7guDJrEfX3qb6FEbdPA5qi",
      "Musics": [
        {
          "name": "As",
          "id": "3Td4BMwaUg5tWCvARo0088"
        },
        {
          "name": "Black America Again",
          "id": "0YW6DKF7hSR5gXrJO2hiJk"
        },
        {
          "name": "Broke (feat. Stevie Wonder & Keith Urban)",
          "id": "4gyRjB6sfjvmJLMv3V21M3"
        },
        {
          "name": "California Roll",
          "id": "1LmOaMuUPQD6BrK9fuGFa8"
        },
        {
          "name": "Do I Do - Single Version",
          "id": "5NClMXEhSzCtO2PGxGqqQk"
        },
        {
          "name": "Don't You Worry 'Bout A Thing",
          "id": "37eC6DX0aYrFGw8cMQaBG5"
        },
        {
          "name": "Faith - From \"Sing\" Original Motion Picture Soundtrack",
          "id": "1ta2S3gzMhDEm4zXj1CMF6"
        },
        {
          "name": "For Once In My Life",
          "id": "2yNWwardt8VzlpNBWrGYD6"
        },
        {
          "name": "From The Bottom Of My Heart",
          "id": "46tLsEFJcVmQveo9hEXUz9"
        },
        {
          "name": "Higher Ground",
          "id": "0nAekUsqPk34wgTyO2AXdj"
        },
        {
          "name": "I Just Called To Say I Love You",
          "id": "4ruHS8PIYMhRD9D5FXYgqM"
        },
        {
          "name": "I Wish",
          "id": "0tqp1kKvgBFsfIszEaviqZ"
        },
        {
          "name": "Isn't She Lovely",
          "id": "373zqV0VLz9mnrSaY9kaiX"
        },
        {
          "name": "Knocks Me Off My Feet",
          "id": "0D0jqVFHiGqVbrQKOUhk9p"
        },
        {
          "name": "Living For The City",
          "id": "1nh8sw0ZDlNbjXTGutpxwl"
        },
        {
          "name": "Master Blaster (Jammin')",
          "id": "0ky5BaGgJJnYATgz2KAc1q"
        },
        {
          "name": "My Cherie Amour",
          "id": "6Udg88zGCFc2xA9M4EavzH"
        },
        {
          "name": "Overjoyed",
          "id": "1phaZkeGoCCpMvoRVW63gc"
        },
        {
          "name": "Part-Time Lover",
          "id": "0ErrsvDylBWZeAUYbqLllv"
        },
        {
          "name": "Pastime Paradise",
          "id": "3FB9tlgXIdyIkmnywJnTyq"
        }
      ],
      "position": 15
    },
    {
      "name": "Sam Cooke",
      "id": "6hnWRPzGGKiapVX1UCdEAC",
      "Musics": [
        {
          "name": "(Ain't That) Good News",
          "id": "4nhV8xaTXIiPz9ZdPqKNSO"
        },
        {
          "name": "A Change Is Gonna Come",
          "id": "0RFKuagqUgR4X8C1QneCCq"
        },
        {
          "name": "Another Saturday Night",
          "id": "7vN6krtNmC15iQgLN5pUib"
        },
        {
          "name": "Blowin' In The Wind",
          "id": "0uzY7bZ5sqamQ0THrXEC3r"
        },
        {
          "name": "Bring It On Home To Me",
          "id": "6CCl6eG9CmTDUdVzVnDlt9"
        },
        {
          "name": "Chain Gang",
          "id": "1sK10Me7qS9em2QTx6dYRe"
        },
        {
          "name": "Cupid",
          "id": "6VuO6xcpSeeLfqBo4ePbkw"
        },
        {
          "name": "Everybody Loves To Cha Cha Cha",
          "id": "6ZqKNPSuBkkk8QYsiD2IVs"
        },
        {
          "name": "For Sentimental Reasons",
          "id": "0xpSC4WOve5Lgy030QkVgI"
        },
        {
          "name": "Get Yourself Another Fool",
          "id": "6X4cYTbSlb1xSS4WEMbDGm"
        },
        {
          "name": "Good Times",
          "id": "62fVi37ZMOYnDXT5hNme2z"
        },
        {
          "name": "Having a Party",
          "id": "1VbD7IkGVqi8VOksRBwrC0"
        },
        {
          "name": "He's My Guide - Take 13",
          "id": "5AVTeX9cy3Hc5b0tf5x4vb"
        },
        {
          "name": "I Don't Want To Cry",
          "id": "5OY7YKCgkQ31PYP6f36ShW"
        },
        {
          "name": "I'll Come Running Back To You",
          "id": "2mXVgWjiZ5C6Vjoq4pDQUG"
        },
        {
          "name": "I'm Gonna Forget About You",
          "id": "5H7G7PhAFrO0zCbEEmjFsF"
        },
        {
          "name": "Jesus Gave Me Water",
          "id": "2pKXue5O7LZKj48RjvmLdR"
        },
        {
          "name": "Keep Movin' On",
          "id": "07w5CgkyS4pbhuRBvbxSaO"
        },
        {
          "name": "Little Red Rooster",
          "id": "1msykqPE0qoZig4nb9khI0"
        },
        {
          "name": "Lost and Lookin'",
          "id": "34EltYEPxM1kwzfvi7PUU9"
        }
      ],
      "position": 16
    },
    {
      "name": "Muddy Waters",
      "id": "4y6J8jwRAwO4dssiSmN91R",
      "Musics": [
        {
          "name": "(I'm Your) Hoochie Coochie Man",
          "id": "4g78lI7TkiIXIOZwzflR2U"
        },
        {
          "name": "Baby, Please Don't Go",
          "id": "0ZUOOHW2551P0RuowO9JJZ"
        },
        {
          "name": "Blow Wind Blow",
          "id": "5VgjDsqs0Jrxfqj4ABpGkq"
        },
        {
          "name": "Champagne & Reefer - Live",
          "id": "2PatEYrrVBNx5LPjTL2ruP"
        },
        {
          "name": "Country Blues (Number One) - Plantation Recordings Version",
          "id": "08G35TbniI3apm4EXZd71r"
        },
        {
          "name": "Dealin' With the Devil",
          "id": "5dpxVXiKhjGehNkEvII5vS"
        },
        {
          "name": "Forty Days and Forty Nights",
          "id": "2hEujEPOw0QmSDPBjO71eg"
        },
        {
          "name": "Good Morning Little School Girl",
          "id": "63iU1ZSjKu6URHbCqHQlQ3"
        },
        {
          "name": "Got My Mojo Working - Live",
          "id": "3LkhowDvQ0ky3LQ5L6TLFk"
        },
        {
          "name": "Honey Bee",
          "id": "1sKRQRt8GfVi8yVj2Baftu"
        },
        {
          "name": "I Can't Be Satisfied",
          "id": "0k1J7gmqiCKtZQ1xSryfZn"
        },
        {
          "name": "I Feel Like Going Home",
          "id": "0iFdYJL9qGxEcWqU3L1u0u"
        },
        {
          "name": "I Just Want To Make Love To You",
          "id": "3ywqjOnAgK749BRGWSCuuy"
        },
        {
          "name": "I'm Ready",
          "id": "1COZZLmAndcx0TbuOFI3LB"
        },
        {
          "name": "I'm Your Hoochie Coochie Man",
          "id": "5gyBM58Jrz6CXmIwJaw5O7"
        },
        {
          "name": "I'm a King Bee",
          "id": "3nV1Sy2qjdZW8Wo7Q0PCpE"
        },
        {
          "name": "Just Make Love To Me",
          "id": "3bk9pkEf5YpO7eBPvY04NC"
        },
        {
          "name": "Long Distance Call",
          "id": "55GukY9HBQzhZQieZRqtus"
        },
        {
          "name": "Louisiana Blues",
          "id": "5q3LjXquX7FSl3LYm9G4C1"
        },
        {
          "name": "Mannish Boy",
          "id": "58PSYdY0GFg0LFb2PxYk4T"
        }
      ],
      "position": 17
    },
    {
      "name": "Marvin Gaye",
      "id": "3koiLjNrgRTNbOwViDipeA",
      "Musics": [
        {
          "name": "Ain't No Mountain High Enough",
          "id": "2H3ZUSE54pST4ubRd5FzFR"
        },
        {
          "name": "Ain't Nothing Like The Real Thing",
          "id": "21hgDlmFHhit010lsbkNln"
        },
        {
          "name": "As Long As She Needs Me",
          "id": "0Fk7txjkWGmQ2FF947o6ua"
        },
        {
          "name": "Baby Baby Come Home",
          "id": "5N8qFRcaBxTf3e4VHwgK4J"
        },
        {
          "name": "Got To Give It Up",
          "id": "1cQBO3VJxv6RWmCsB5KSOI"
        },
        {
          "name": "How Sweet It Is (To Be Loved By You)",
          "id": "1ws2GuaartdkKwZHihTJEK"
        },
        {
          "name": "I Heard It Through The Grapevine",
          "id": "27m1soUndRthrAA1ediOXn"
        },
        {
          "name": "I Want You",
          "id": "52xaJc4wvVDV4KJMEnerF1"
        },
        {
          "name": "Inner City Blues (Make Me Wanna Holler)",
          "id": "3i5DWfyMJOKCtspfyotWJD"
        },
        {
          "name": "Keep Gettin' It On",
          "id": "2vygASGhn68mkn8iE3cQwr"
        },
        {
          "name": "Let's Get It On",
          "id": "4WGENqnUmbv0Ml9NwXMlsD"
        },
        {
          "name": "Mercy Mercy Me (The Ecology)",
          "id": "0P0XtIqjMv1zMSsX76mhY8"
        },
        {
          "name": "Music - feat. Marvin Gaye",
          "id": "2g4SumkFZpHOypfF5xng9Z"
        },
        {
          "name": "Sexual Healing",
          "id": "3IOwoXoGARaHYalfwyu9Rn"
        },
        {
          "name": "Stop, Look, Listen (To Your Heart)",
          "id": "42rdpIodE7tRbb03iEtviE"
        },
        {
          "name": "Sunny",
          "id": "07cioXk8gedsOzebu3sQnS"
        },
        {
          "name": "Trouble Man",
          "id": "0RBNizdyQEsFN5oX8yWEkU"
        },
        {
          "name": "What's Going On",
          "id": "0IUTOvJZ6brXtvMZWipush"
        },
        {
          "name": "What's Happening Brother",
          "id": "3xCE7IebQTcFecIX1kyKPx"
        },
        {
          "name": "Witchcraft",
          "id": "2xsrlvMPPbwn5ls740fwCT"
        }
      ],
      "position": 18
    },
    {
      "name": "The Velvet Underground",
      "id": "1nJvji2KIlWSseXRSlNYsC",
      "Musics": [
        {
          "name": "After Hours",
          "id": "2y6gGIDH1HGUHLIlf6zY3B"
        },
        {
          "name": "All Tomorrow's Parties",
          "id": "7xPNrZ8O619whIK568Wcgz"
        },
        {
          "name": "Beginning To See The Light",
          "id": "1z3Wqn0prrRdqpxhICzGvK"
        },
        {
          "name": "Black Angel's Death Song",
          "id": "6DoUSm5gkXm0T3pv9O38mA"
        },
        {
          "name": "Candy Says",
          "id": "6calPclH7TeFHvjnmq7OAp"
        },
        {
          "name": "Cool It Down - 2015 Remastered",
          "id": "2YyONIkw0mFNHKRVkbjJI8"
        },
        {
          "name": "European Son",
          "id": "0959tCAsdMARv7rezm1fiC"
        },
        {
          "name": "Femme Fatale",
          "id": "79DRfWneKWGuWUJE6kHg3b"
        },
        {
          "name": "Here She Comes Now",
          "id": "2cc97JuCnDhIfCceElzDBC"
        },
        {
          "name": "Heroin",
          "id": "5ikUhVo4GHG0mVkSZjft4y"
        },
        {
          "name": "I Found A Reason - 2015 Remastered",
          "id": "3AFImoxgt7EmXHgpaGLbLt"
        },
        {
          "name": "I'll Be Your Mirror",
          "id": "3V1EpLi9z0uhupGLvhOH27"
        },
        {
          "name": "I'm Set Free",
          "id": "4Y9f7hqSsqRlUiBaOSm56r"
        },
        {
          "name": "I'm Sticking With You",
          "id": "5JFNFvxXhPhwx39TwVdsDI"
        },
        {
          "name": "I'm Waiting For The Man",
          "id": "6dkHUE0h7urXcIZwBNcz24"
        },
        {
          "name": "Jesus",
          "id": "7hhSYj4uXPdb9wBazrBfbt"
        },
        {
          "name": "New Age - 2015 Remastered Full Length Version",
          "id": "5HsAR5wajzn4JideTD4SXs"
        },
        {
          "name": "Oh! Sweet Nuthin' - 2015 Remastered",
          "id": "4Wi6OrpIzvG0dRHN8pVuTs"
        },
        {
          "name": "Pale Blue Eyes",
          "id": "1cG560wZP0s6fs1nsEVtQw"
        },
        {
          "name": "Rock & Roll (Mono) - 2015 Remastered",
          "id": "0oJXF6lAJxQ540X6ab4LYS"
        }
      ],
      "position": 19
    },
    {
      "name": "Bo Diddley",
      "id": "2bmixwMZXlkl2sbIbOfviq",
      "Musics": [
        {
          "name": "Before You Accuse Me (Take A Look At Yourself)",
          "id": "5en2phuLkKQRI3j6vb8ICW"
        },
        {
          "name": "Bo Diddley",
          "id": "3mEVOdYRLFJ3RBGmsiGAJD"
        },
        {
          "name": "Bo's Guitar",
          "id": "6YLVmB3cSs81LcNTm1zz6t"
        },
        {
          "name": "Bring It To Jerome",
          "id": "6HOnnGxHf8Gytl6Sr2tuaq"
        },
        {
          "name": "Cadillac",
          "id": "2cAwdLifKEudvmR8NBwYZD"
        },
        {
          "name": "Crackin' Up",
          "id": "6L7OLKRKEsNKB6FEcapH2m"
        },
        {
          "name": "Diddley Daddy - Single Version",
          "id": "3IKovzr3jfSfcZBmfCx72x"
        },
        {
          "name": "Diddy Wah Diddy",
          "id": "4AcRyvmN7xyZEKzFbfgRHc"
        },
        {
          "name": "Heart-O-Matic Love",
          "id": "7yWLuVP0Lyx09SdOeLkQsQ"
        },
        {
          "name": "Hey Good Looking",
          "id": "21Bkm9opkUpBdI3TKfUbFN"
        },
        {
          "name": "Hey! Bo Diddley",
          "id": "5sJspQ16H1ro4SQJpJ7eVP"
        },
        {
          "name": "I Can Tell",
          "id": "6K7KyYtO8AU9j2nANpRzfc"
        },
        {
          "name": "I'm A Man",
          "id": "0tDYT1z7lFCQCVlqTeHHtb"
        },
        {
          "name": "Little Girl",
          "id": "6htZi2A7FbtVcneJ1BSz4L"
        },
        {
          "name": "Love Is Strange",
          "id": "1tGvz55rRf0WsYfpaixuQi"
        },
        {
          "name": "Mona - Single Version",
          "id": "2hfSnjyNwGsPKfLDtax99Y"
        },
        {
          "name": "Oh Yea",
          "id": "0FHkFqdeGbUj6yVIke0MfD"
        },
        {
          "name": "Ooh Baby",
          "id": "78JEARS7gzYUmlFLzZvLfv"
        },
        {
          "name": "Our Love Will Never Go",
          "id": "1nSJowjWx2o8iGhjV6yJB5"
        },
        {
          "name": "Pills",
          "id": "3Ise3a22NuRmT4dBnCEKOl"
        }
      ],
      "position": 20
    },
    {
      "name": "Otis Redding",
      "id": "60df5JBRRPcnSpsIMxxwQm",
      "Musics": [
        {
          "name": "(Sittin' On) The Dock Of The Bay",
          "id": "50uGbeaQIxKiSc7jvRTjWx"
        },
        {
          "name": "Cigarettes And Coffee",
          "id": "1VdZa7FdO7nD32NVIHLqOA"
        },
        {
          "name": "For Your Precious Love",
          "id": "4PVpQTR2tcgeBlO31jMsLm"
        },
        {
          "name": "Hard To Handle",
          "id": "2bVwPO0xnDf6WYvTn8qUOD"
        },
        {
          "name": "Hey Hey Baby",
          "id": "0X6Y7VVMWcWhtsxG9RKjq5"
        },
        {
          "name": "I Love You More Than Words Can Say",
          "id": "6pIQthK47HGXz2SLwrolj4"
        },
        {
          "name": "I Need Your Lovin'",
          "id": "2vSUOgn1T214EZrEJ5vruF"
        },
        {
          "name": "I've Been Loving You Too Long - Remastered Mono",
          "id": "4pdLyulbYLCrPmDzWWeJIZ"
        },
        {
          "name": "I've Got Dreams To Remember",
          "id": "0scZC582F1FFV79QRRMQnQ"
        },
        {
          "name": "Let Me Come On Home",
          "id": "3QOSKKTi22qp8hoYm56kr5"
        },
        {
          "name": "Louie Louie",
          "id": "4157e5s9xqdGB69YY6kvHn"
        },
        {
          "name": "Love Man",
          "id": "16dz1n3ctolQbuZPtvHVqH"
        },
        {
          "name": "Mr. Pitiful",
          "id": "41XPLxAYGkZ8xeUHqDmKtA"
        },
        {
          "name": "My Girl - Remastered Mono",
          "id": "5zQyqgNXKzhifkivumzxDS"
        },
        {
          "name": "Otis",
          "id": "14I61w6cyYUHiV2n28IYdP"
        },
        {
          "name": "Pain In My Heart (Single/LP Version)",
          "id": "6vPS75nWOKkuH5WTLD8hDc"
        },
        {
          "name": "Respect",
          "id": "7gUnkaiT3XAiMoAvsJFOaJ"
        },
        {
          "name": "Satisfaction",
          "id": "1klqBqLXdUN6ilIhtOAYtm"
        },
        {
          "name": "Shake - Remastered Stereo",
          "id": "6RkyopJ2y0DnoIrq57zrap"
        },
        {
          "name": "Stand By Me",
          "id": "3xu9KnexpbxakXCsfOO71y"
        }
      ],
      "position": 21
    },
    {
      "name": "U2",
      "id": "51Blml2LZPmy7TTiAg47vQ",
      "Musics": [
        {
          "name": "Bad",
          "id": "2mGggy2InQlzM1O82NEEU4"
        },
        {
          "name": "Beautiful Day",
          "id": "0gzqZ9d1jIKo9psEIthwXe"
        },
        {
          "name": "California (There Is No End To Love)",
          "id": "7DYh1BNqdOSbNCBRLDLgMJ"
        },
        {
          "name": "Cedarwood Road",
          "id": "2aJhiU35Cu6Pydq6xZUXcv"
        },
        {
          "name": "City Of Blinding Lights",
          "id": "1F6tJQxkLDojD21hKrEzwJ"
        },
        {
          "name": "Elevation",
          "id": "4BC2WQKrZdqMX6rHsvVbUy"
        },
        {
          "name": "Every Breaking Wave",
          "id": "4z5eLUR8oCbRywMw1ytNol"
        },
        {
          "name": "I Still Haven't Found What I'm Looking For",
          "id": "3NldGYmhDLK98kOOo4J1lg"
        },
        {
          "name": "In A Little While",
          "id": "1NBf3nsIIaBTikQzV5hICg"
        },
        {
          "name": "Iris (Hold Me Close)",
          "id": "7kbQE1Xbyf7kvcn4DVICiR"
        },
        {
          "name": "Kite",
          "id": "4Wjaa3vx2BiLGF01AZMlHb"
        },
        {
          "name": "Lemon",
          "id": "02d6RIbA7iGRugnvUmurVV"
        },
        {
          "name": "Magnificent",
          "id": "6u38x61qv7JBIJD4dqztmm"
        },
        {
          "name": "Miracle Drug",
          "id": "7iUnz032LSmFXvxjppkV58"
        },
        {
          "name": "Moment Of Surrender",
          "id": "2PwwiKJYMYbuWh7j5yAbwT"
        },
        {
          "name": "New Year's Day",
          "id": "7w3klLQ4XYHxEdYL50qX9M"
        },
        {
          "name": "One",
          "id": "3PKtemUKxiDBvBo7tpQ8bG"
        },
        {
          "name": "Ordinary Love",
          "id": "7kCrYUDtWsPldohOKPTKPL"
        },
        {
          "name": "Pride (In The Name Of Love)",
          "id": "0RpfVU55mGiJNKEKX0oQ8y"
        },
        {
          "name": "Raised By Wolves",
          "id": "0eW6LK9xeddRp1u5BnfrjW"
        }
      ],
      "position": 22
    },
    {
      "name": "Bruce Springsteen",
      "id": "3eqjTLE0HfPfh78zjh6TqT",
      "Musics": [
        {
          "name": "4th of July, Asbury Park (Sandy)",
          "id": "54yfe0cZ0FXhEXscncAxdY"
        },
        {
          "name": "Adam Raised a Cain",
          "id": "39J5RXFJG6MCjHql3a0Hat"
        },
        {
          "name": "Atlantic City",
          "id": "1Vp8U39YNsDfd6yVuaUq12"
        },
        {
          "name": "Badlands",
          "id": "0M1YQiRGel1tTMjA3orfRd"
        },
        {
          "name": "Blinded by the Light",
          "id": "1VyDQtfhX6gqhWTGU7Oe8X"
        },
        {
          "name": "Bobby Jean",
          "id": "2KPzDsCtQtIM0Lkh3RacRC"
        },
        {
          "name": "Born in the U.S.A.",
          "id": "7zrPuEYifsTfBll62RZ30C"
        },
        {
          "name": "Born to Run",
          "id": "6hTcuIQa0sxrrByu9wTD7s"
        },
        {
          "name": "Cover Me",
          "id": "4U7NhC2rQTAhH7dw7H0goB"
        },
        {
          "name": "Dancing In the Dark",
          "id": "2roLK7pDynp5eb5hMZNHgq"
        },
        {
          "name": "Darlington County",
          "id": "3O5RCjnjWlF0CYkcvJaGVm"
        },
        {
          "name": "Devils & Dust",
          "id": "4YUSC63LMMUbaeLjcfT4Go"
        },
        {
          "name": "Downbound Train",
          "id": "4a0oZYU2ntSUof4lkm2PCl"
        },
        {
          "name": "Glory Days",
          "id": "2Y90nL1ohB4sgYELDs7uNx"
        },
        {
          "name": "Growin' Up",
          "id": "7oAVW3eC8hwcxfWe8qWZuQ"
        },
        {
          "name": "Henry Boy",
          "id": "3VMSj3Nv5LTtji0aA7FFYv"
        },
        {
          "name": "High Hopes",
          "id": "4sqOaeVz6CcKUxlEcgzCMZ"
        },
        {
          "name": "Human Touch",
          "id": "1o53HbxmOy5TzThJdBaDZb"
        },
        {
          "name": "Hungry Heart",
          "id": "1KsI8NEeAna8ZIdojI3FiT"
        },
        {
          "name": "I'm Goin' Down",
          "id": "0VkDedVtP7TQDlaCMq9QVx"
        }
      ],
      "position": 23
    },
    {
      "name": "Jerry Lee Lewis",
      "id": "2zyz0VJqrDXeFDIyrfVXSo",
      "Musics": [
        {
          "name": "Be Bop a Lula",
          "id": "4WTvbDttoCQqHID6MWtr8t"
        },
        {
          "name": "Blues Like Midnight",
          "id": "1r0Louf66zCts5LE7wolM8"
        },
        {
          "name": "Breathless",
          "id": "6P6ZeEZtqf7FoJ60GIKWL7"
        },
        {
          "name": "Bright Lights, Big City",
          "id": "7qIJxID8kM1tEw4b4yLZW3"
        },
        {
          "name": "Crazy Arms",
          "id": "7mhL4tHAw3FEzIvTWAEHiK"
        },
        {
          "name": "Don't Be Cruel - Sun Records Version",
          "id": "0q4vhpxRAJBPwtmEXajbE0"
        },
        {
          "name": "Down The Line",
          "id": "1HHobQIn1s7RRqUk23PZCV"
        },
        {
          "name": "End of the Road",
          "id": "3Rjy1fBclbTlnaj5HsnSgI"
        },
        {
          "name": "Folsom Prison Blues",
          "id": "5241H5YUs4Kf9o8NKiIwu5"
        },
        {
          "name": "Fools Like Me",
          "id": "6X2ewTZwrJcW040ww1tBpv"
        },
        {
          "name": "Good Golly, Miss Molly - Live At The Star-Club, Hamburg, Germany/1964",
          "id": "7o1YOnkZBCXwKytbCsVUc0"
        },
        {
          "name": "Great Balls Of Fire",
          "id": "4S9WWr42OEWNbA7SVt9xEY"
        },
        {
          "name": "Here Comes That Rainbow Again",
          "id": "1GHdWKhTb6O4FKRwLJH9eV"
        },
        {
          "name": "High School Confidential",
          "id": "1dkOzzk8kvHTeWypcYLV8O"
        },
        {
          "name": "Hit The Road Jack",
          "id": "66XXNFZc2pXEvQJxjXljPT"
        },
        {
          "name": "Jambalaya",
          "id": "4uHeKyqaU089HL5vmgW83L"
        },
        {
          "name": "Johnny B. Goode / Whole Lotta Shakin Going On",
          "id": "2mlDldZxsuwthsMEpZZCSC"
        },
        {
          "name": "Keep Me In Mind",
          "id": "1Id3d8kF2x2NJqiM0tFWhs"
        },
        {
          "name": "Keep My Motor Runnin'",
          "id": "2nI9nm38HW0WDWPxsTzLOc"
        },
        {
          "name": "Lewis Boogie",
          "id": "3IuN8pfDTWrn9tZf8NnocY"
        }
      ],
      "position": 24
    },
    {
      "name": "Fats Domino",
      "id": "09C0xjtosNAIXP36wTnWxd",
      "Musics": [
        {
          "name": "Ain't That A Shame",
          "id": "617uJqZrXJJypEuaALXutM"
        },
        {
          "name": "Ain't That A Shame? - 2002 Digital Remaster",
          "id": "7I7lZjnuj3npLFCWodA5Xk"
        },
        {
          "name": "Ain’t That a Shame / Good Golly Miss Molly",
          "id": "4bC4PfrVTCf0ETgy2vHArM"
        },
        {
          "name": "All By Myself",
          "id": "3tAuacljtQpS8Ulsy3q4Gb"
        },
        {
          "name": "Be My Guest - 2002 Digital Remaster",
          "id": "3Vumfl7U0v6EjLZoFvDTfe"
        },
        {
          "name": "Blue Monday",
          "id": "6Cbq1REcxHrGqgp3ltMGci"
        },
        {
          "name": "Blueberry Hill",
          "id": "5A6A0md0TDTXHyJK8IQaUy"
        },
        {
          "name": "Darktown Strutters' Ball",
          "id": "34lGOTmtvXuIWecEnc780B"
        },
        {
          "name": "Don't Blame It On Me - 2002 Digital Remaster",
          "id": "5V0kGdXu2ydtvoBsrmfeWl"
        },
        {
          "name": "Goin' Home - 2002 Digital Remaster",
          "id": "18dO1Dn8DAACbMsgqTIw99"
        },
        {
          "name": "Going To The River - 2002 Digital Remaster",
          "id": "5l416NMlnkvovyQNFxjyXn"
        },
        {
          "name": "Hello Josephine",
          "id": "5nSu7x0ENZnrURGicJA8lP"
        },
        {
          "name": "Honey Chile - 2002 Digital Remaster",
          "id": "059h3p8VZiaAdCpa0eY7Ad"
        },
        {
          "name": "I Still Love You",
          "id": "0CN9O87FETPjtDmfOFBgX4"
        },
        {
          "name": "I Want To Walk You Home - 2002 Digital Remaster",
          "id": "2irSsbGB2N1M4nB4G26qBf"
        },
        {
          "name": "I'm Gonna Be A Wheel Someday - 2002 Digital Remaster",
          "id": "0cKcstKguEmUhhsBOixNxM"
        },
        {
          "name": "I'm In Love Again",
          "id": "1ziuig2ToeMoKcWOt0xRnj"
        },
        {
          "name": "I'm Ready",
          "id": "0zu6xIXRs7PPXAjvNMx9s3"
        },
        {
          "name": "I'm Walkin'",
          "id": "4z63jB7Ucg9HXMoKmOaN64"
        },
        {
          "name": "I'm Walking",
          "id": "5kFbma7F9lLAkhRjX8z56f"
        }
      ],
      "position": 25
    },
    {
      "name": "Ramones",
      "id": "1co4F2pPNH8JjTutZkmgSm",
      "Musics": [
        {
          "name": "Baby, I Love You",
          "id": "29imR7dda5XqwPRFmby7HS"
        },
        {
          "name": "Beat On The Brat (Remastered Version )",
          "id": "3HVUvLe8yJ4WXLNMmfuisL"
        },
        {
          "name": "Blitzkrieg Bop - 2016 Remastered",
          "id": "4KcH1ZRV2W1q7Flq0QqC76"
        },
        {
          "name": "Bonzo Goes To Bitberg - Live",
          "id": "6yLAAFAwq6klV86SiHASe7"
        },
        {
          "name": "California Sun - Remastered Version",
          "id": "6wsVjJTXgRuAZ4VE7WPk74"
        },
        {
          "name": "Censorshit",
          "id": "0hfsk5X8VPsaxip5cptvn1"
        },
        {
          "name": "Chain Saw",
          "id": "0qh1urPOJNYPrBQREE5lLS"
        },
        {
          "name": "Do You Remember Rock And Roll Radio",
          "id": "2Ck23L2znrPAFiyopqzWUj"
        },
        {
          "name": "Do You Wanna Dance - Remastered",
          "id": "6Nb1RoQs607x1wLZT01z7i"
        },
        {
          "name": "Havana Affair",
          "id": "2A0zKcpBgK7v9G2gsimPIY"
        },
        {
          "name": "I Believe In Miracles",
          "id": "6YYGoARcDRYdJu9ezMPzUx"
        },
        {
          "name": "I Don't Wanna Go Down To The Basement",
          "id": "6WPZnQd1Ic50z5RzKWhZKT"
        },
        {
          "name": "I Don't Want To Grow Up",
          "id": "1mJ7yK70zjY1VCaRP04ot4"
        },
        {
          "name": "I Just Want To Have Something To Do - Remastered Version",
          "id": "3FEHv0NlGXYzdUwiIaoJY8"
        },
        {
          "name": "I Wanna Be Sedated - Remastered",
          "id": "6vvmYYUvGXtZLU8msxKvzF"
        },
        {
          "name": "I Wanna Be Your Boyfriend",
          "id": "70U8S3FnHJlwPuid3D2A5d"
        },
        {
          "name": "Judy Is A Punk",
          "id": "0vGCxnTwYZFtOAW3oz28kd"
        },
        {
          "name": "Life's A Gas",
          "id": "5YsuX6S5Qwx1D0mowihvTk"
        },
        {
          "name": "Loudmouth",
          "id": "18hdp5HzsWTsl6NjsPhnpB"
        },
        {
          "name": "Merry Christmas (I Don't Want To Fight Tonight)",
          "id": "6HA6r647BX7lOIDzQ3PBb9"
        }
      ],
      "position": 26
    },
    {
      "name": "The Clash",
      "id": "3RGLhK1IP9jnYFH4BRFJBS",
      "Musics": [
        {
          "name": "(White Man) in Hammersmith Palais",
          "id": "45xBWOa6oEAk1WlVyr5QAB"
        },
        {
          "name": "Atom Tan",
          "id": "5rL2E6ZlMJYMdV799HumhZ"
        },
        {
          "name": "Bankrobber",
          "id": "6gSDSkAJ3vuSINvcroq1Vn"
        },
        {
          "name": "Brand New Cadillac",
          "id": "7FYkZkF9fog6WS818wJnhl"
        },
        {
          "name": "Car Jamming",
          "id": "3QcqUffnkbQGWJlfyaT3yF"
        },
        {
          "name": "Charlie don't Surf",
          "id": "5T4j3Uv33fQO7tsR2lMl4y"
        },
        {
          "name": "Clampdown",
          "id": "66MwdlxiFMZ8TJGLEJnS7x"
        },
        {
          "name": "Complete Control",
          "id": "0mlwPYU0ApElSjZN4yA4L9"
        },
        {
          "name": "Death or Glory",
          "id": "3lUVy400HL94NB03paDTyN"
        },
        {
          "name": "Four Horsemen",
          "id": "2X89n7LOYnkKzfIlvi8sRp"
        },
        {
          "name": "Hateful",
          "id": "2FNsNZjUQg3bhx5dWW0pRs"
        },
        {
          "name": "I Fought the Law",
          "id": "7lSDCrF11sdTVfjbAQVZE8"
        },
        {
          "name": "I'm Not Down",
          "id": "1eijsmCG81EUB5YGGAz6Yv"
        },
        {
          "name": "Janie Jones",
          "id": "6ywRlumSQjOOkcSnJYAgHw"
        },
        {
          "name": "Jimmy Jazz",
          "id": "06JxwPA4WAg0LWADJtaldL"
        },
        {
          "name": "Know Your Rights",
          "id": "31l6t3Jq09uywRTVGbzant"
        },
        {
          "name": "Koka Kola",
          "id": "1YvbtzUkXtgotCTo6QeqkW"
        },
        {
          "name": "Kosmo Vinyl Introduction - Live at Shea Stadium",
          "id": "4ADBECleY1W07PUKeKbsBN"
        },
        {
          "name": "London Calling - 2012 Mix",
          "id": "4cIQVD4UKuAgjy4bNc6qkQ"
        },
        {
          "name": "London's Burning",
          "id": "0y8zZOu4u6NmoW7u1jEQzo"
        }
      ],
      "position": 27
    },
    {
      "name": "The Who",
      "id": "67ea9eGLXYMsO2eYQRui3w",
      "Musics": [
        {
          "name": "A Quick One, While He's Away - Mono Version",
          "id": "3n2LVedkCL8X9DXobLuvfo"
        },
        {
          "name": "Anyway Anyhow Anywhere",
          "id": "5XqPmKfRiP9t1HweAeLuWH"
        },
        {
          "name": "Baba O'Riley",
          "id": "1rhuogOt9ZGejJXnKDYAyD"
        },
        {
          "name": "Bargain",
          "id": "6klWeTm2dZQXjAh3IuHW3O"
        },
        {
          "name": "Behind Blue Eyes",
          "id": "2X59ZxwE9x4pWnxsxKhr1E"
        },
        {
          "name": "Cut My Hair - Live In London / 2013",
          "id": "7p1dHtExtfAoPUGMS7UCdd"
        },
        {
          "name": "Eminence Front",
          "id": "3Ml4wVs02wZYbNk5YJikdM"
        },
        {
          "name": "Getting In Tune",
          "id": "4qKBKE1qWrbZLdFgCIZPXV"
        },
        {
          "name": "Going Mobile - Remix",
          "id": "1HWjMAZgaKN6gDIADvhG0j"
        },
        {
          "name": "I Am The Sea - Live In London / 2013",
          "id": "0WnIcoUBoUjZxCJqls4Msh"
        },
        {
          "name": "I Can See For Miles",
          "id": "2djoYMtTc6eMRVDJ5oEuxm"
        },
        {
          "name": "I Can't Explain - Mono Version",
          "id": "2V98i6cPueTrz1jG1wqjvt"
        },
        {
          "name": "I'm Free",
          "id": "04vegLFXFVr9nXEF4dO1nC"
        },
        {
          "name": "Join Together",
          "id": "0ftbh0cFw4m88mfmTM4asw"
        },
        {
          "name": "Love Ain't For Keeping",
          "id": "3dtFNUsayBuKUnTOVd2MLG"
        },
        {
          "name": "Love Reign O'er Me",
          "id": "0EF4KrU0dJ0lBEkqMyzlIi"
        },
        {
          "name": "Magic Bus - Edit Mono Version",
          "id": "3mwntuQnPHAO5jcCr5wSpK"
        },
        {
          "name": "My Generation - Original Mono Version",
          "id": "6UdCTwbVAvNqbWyZKZiRWL"
        },
        {
          "name": "My Wife - Original Album Version",
          "id": "6PEpx15f4me9PcaxPdVUVt"
        },
        {
          "name": "Overture",
          "id": "2gdK3abslf6RCd3OR3NYay"
        }
      ],
      "position": 28
    },
    {
      "name": "Nirvana",
      "id": "6olE6TJLqED3rqDCT0FyPh",
      "Musics": [
        {
          "name": "About A Girl",
          "id": "0zeqKbySjKbfW5jyl3PMsW"
        },
        {
          "name": "All Apologies",
          "id": "5sWMEcMemPH3Bc8hxeivIi"
        },
        {
          "name": "And I Love Her",
          "id": "4RBoQQCEJZxIGv4UHq3c4R"
        },
        {
          "name": "Aneurysm - 1992/Live at Reading",
          "id": "4w8pMNjlVefBOka4Awhfg4"
        },
        {
          "name": "Breed",
          "id": "6kA9cOS2QpUpeGJHGxSXe1"
        },
        {
          "name": "Come As You Are",
          "id": "2RsAajgo0g7bMCHxwH3Sk0"
        },
        {
          "name": "Drain You",
          "id": "5OwponLnwCAYnWql6cwBru"
        },
        {
          "name": "Dumb",
          "id": "6OaCwySGYg30ncfsjKNbtM"
        },
        {
          "name": "Heart-Shaped Box",
          "id": "6EvgWSbWmQelxrQBmhEdXh"
        },
        {
          "name": "In Bloom - 1992/Live at Reading",
          "id": "6PVLfkwBtG50sFw96KXCb6"
        },
        {
          "name": "Jesus Doesn't Want Me For A Sunbeam",
          "id": "4UnbdQoTvXhiKpPCBgW8Tn"
        },
        {
          "name": "Lake Of Fire",
          "id": "3aKJVWH2QOsaMtiCLxYHZX"
        },
        {
          "name": "Lithium",
          "id": "26D1PRJjD9Jj1JGRk88KVc"
        },
        {
          "name": "Lounge Act",
          "id": "4iuPYtP5sSsmeG7mcoMoKY"
        },
        {
          "name": "Oh Me",
          "id": "4L0CZr4WM32ymqvAsUoeeS"
        },
        {
          "name": "On A Plain",
          "id": "6QHIhlLTb02tvEPtZZtXXw"
        },
        {
          "name": "Pennyroyal Tea",
          "id": "2f3pT7xCMaNUL3jWNZDSto"
        },
        {
          "name": "Plateau",
          "id": "5zYoaHjRlIEAK2jJJzHkmO"
        },
        {
          "name": "Polly",
          "id": "2SJ38LDlkNjwWSUq98r4Q5"
        },
        {
          "name": "Rape Me",
          "id": "68apP5B8WkYd01CWNBlYoQ"
        }
      ],
      "position": 29
    },
    {
      "name": "Johnny Cash",
      "id": "6kACVPfCOnqzgfEF5ryl0x",
      "Musics": [
        {
          "name": "(Ghost) Riders In the Sky",
          "id": "3DNXN5fPRdkYm64oCdV8L6"
        },
        {
          "name": "A Boy Named Sue (Live in Denmark) - Live",
          "id": "4VkgY55sUbfszX3XjS3LxW"
        },
        {
          "name": "Ain't No Grave",
          "id": "3VSW7iXXxXMPBULAXLhEGc"
        },
        {
          "name": "Bridge Over Troubled Water",
          "id": "0vYpzxvJjAyBO29cXrli3g"
        },
        {
          "name": "Country Boy",
          "id": "5lSAHnbyezD3JIsMbUDPGH"
        },
        {
          "name": "Cry, Cry, Cry",
          "id": "3wH0LkF5GOSkqE59a4Nmg9"
        },
        {
          "name": "Folsom Prison Blues",
          "id": "5ZfCqpMKf9zSZ99Z9ZKYkG"
        },
        {
          "name": "Frankie’s Man Johnny",
          "id": "3Ob0dQQicgBsHKafry4rC5"
        },
        {
          "name": "Get Rhythm",
          "id": "1RIIMW4Df5Z7YTKHbXORiO"
        },
        {
          "name": "Girl from the North Country",
          "id": "4K1imZQQ0yKtJ40vGmUajS"
        },
        {
          "name": "God's Gonna Cut You Down",
          "id": "7mp0Pe8KPsFbRqG4Yn0enA"
        },
        {
          "name": "Heart Of Gold",
          "id": "17VzFRh9750Fx1kkLVAMeq"
        },
        {
          "name": "Hey Porter",
          "id": "5xpTvAYH6Jq0pCtyV70oEu"
        },
        {
          "name": "Hurt",
          "id": "6mVag9CHkvGewiUw6BRlqB"
        },
        {
          "name": "I See A Darkness",
          "id": "0IqKNCWPURIZxOvHlM7bxI"
        },
        {
          "name": "I Walk the Line",
          "id": "7hxZF4jETnE5Q75rKQnMjE"
        },
        {
          "name": "I Won't Back Down",
          "id": "2r1WyawAEquFyJc81xCv50"
        },
        {
          "name": "I've Been Everywhere",
          "id": "6y8zaPjL3eHZW3UAuL2VJo"
        },
        {
          "name": "In My Life",
          "id": "3Ba6la1CC5tr4GKDcFO0xR"
        },
        {
          "name": "It Ain't Me, Babe",
          "id": "7hJBjMGJHHQ4cR4Jhzp1d1"
        }
      ],
      "position": 30
    },
    {
      "name": "Smokey Robinson",
      "id": "0h9smro0z3HqUbD94jotU8",
      "Musics": [
        {
          "name": "Baby Come Close",
          "id": "7rENPsD1QtOGlZ1zHhdmOt"
        },
        {
          "name": "Baby That's Backatcha",
          "id": "1bNUUD4JYE4a4nciu4jU0n"
        },
        {
          "name": "Being With You",
          "id": "77eYylG3TPmr9nmpdxadqw"
        },
        {
          "name": "Cruisin'",
          "id": "2tztJrwLb26uOuuerxz4jz"
        },
        {
          "name": "Ebony Eyes",
          "id": "4W3E4s3tHP5ha5vntD7K5l"
        },
        {
          "name": "From Head To Toe",
          "id": "0pV7ifOs1GMZSp6gU5tGrT"
        },
        {
          "name": "Get Ready",
          "id": "3nXulYi7JAjUTiymaCQwZR"
        },
        {
          "name": "Going To A Go-Go",
          "id": "6v5Teo5ohFzI1ePATWtoyV"
        },
        {
          "name": "I Heard It Through The Grapevine - Mono Version",
          "id": "5krv0bYft9bA32PK7QrnLz"
        },
        {
          "name": "I Like It Like That",
          "id": "2L9Piq5VJPLdqjyJtgBuRC"
        },
        {
          "name": "I Second That Emotion",
          "id": "0p005IFxS4eFfXNk0m7jjM"
        },
        {
          "name": "Just To See Her",
          "id": "3cnhxfZKkInCSlC0otZvID"
        },
        {
          "name": "Let Me Be The Clock",
          "id": "79l0941BuHfa6t1DPqFWKP"
        },
        {
          "name": "Mickey's Monkey",
          "id": "7IBIPzEuTzz1zk0eEF5KAK"
        },
        {
          "name": "More Love",
          "id": "10VysOTXzHx2Vl4CRQgWJv"
        },
        {
          "name": "My Girl",
          "id": "0mMGi2AOVP2AiV8N7DT3eg"
        },
        {
          "name": "One Heartbeat",
          "id": "5DVmU7YmLOae7UFefRwxUC"
        },
        {
          "name": "Ooo Baby Baby",
          "id": "5E8YpBE5oaJCOjuGkL2IWT"
        },
        {
          "name": "Quiet Storm",
          "id": "1Vk98GLV8TPQtpRcCfV1Nx"
        },
        {
          "name": "The Agony And The Ecstasy",
          "id": "79ddVc6hVUN1EXlwq9Enxo"
        }
      ],
      "position": 31
    },
    {
      "name": "The Everly Brothers",
      "id": "4ACplpEqD6JIVgKrafauzs",
      "Musics": [
        {
          "name": "('Til) I Kissed You",
          "id": "2erTdgDOZmjJNaNhjhWXhJ"
        },
        {
          "name": "All I Have To Do Is Dream",
          "id": "1SQGSBNb2Hgfaol3QS5RXY"
        },
        {
          "name": "Bird Dog",
          "id": "2ZCkqAo0tzzCVOth7ityh5"
        },
        {
          "name": "Burma Shave",
          "id": "2xNLrSFH9PkQIZv348GkLy"
        },
        {
          "name": "Bye Bye Love",
          "id": "6oRHRkQigTzJ3KwpO3XOV6"
        },
        {
          "name": "Cathy's Clown",
          "id": "1MA9StLzlFftLbuqOmoWij"
        },
        {
          "name": "Crying In The Rain",
          "id": "4UcoThIM9NMOHUwQgCcUDy"
        },
        {
          "name": "Dancing On My Feet",
          "id": "1NnVf4QX6QWDXMN33eL84U"
        },
        {
          "name": "Devoted To You",
          "id": "4FrMb1ckGBrhARbHySQKx5"
        },
        {
          "name": "Ebony Eyes",
          "id": "2iUSQIm0rTzav4MvEfSQv2"
        },
        {
          "name": "Gone, Gone, Gone (Remastered Album Version)",
          "id": "0Suvt6p6nR713tBFWXaGtr"
        },
        {
          "name": "Gran Mamou",
          "id": "6BBKdD2tWpREh0cUzpGrF0"
        },
        {
          "name": "I Can't Say Goodbye To You",
          "id": "24TtjVPpY6uuWxKKmosG28"
        },
        {
          "name": "Let It Be Me",
          "id": "0Tjdbd83LEAWrA0atsXMDJ"
        },
        {
          "name": "Little Hollywood Girl",
          "id": "3sm1GFbcOUtYbU0m8y7Pdc"
        },
        {
          "name": "Love Hurts",
          "id": "35QoHS1xi2n5SQ2xora5en"
        },
        {
          "name": "Lucille",
          "id": "5C9ZW69WIoyEGg7QGJaIWI"
        },
        {
          "name": "My Gal Sal",
          "id": "0CXmmpqLjNZ71bg5EeyfXj"
        },
        {
          "name": "Nancy's Minuet",
          "id": "6kwTBHqcDrJfxwU9Gxhgvw"
        },
        {
          "name": "Nashville Blues",
          "id": "4wDA2Kmd7PsZsk87YshKP0"
        }
      ],
      "position": 32
    },
    {
      "name": "Neil Young",
      "id": "6v8FB84lnmJs434UJf2Mrm",
      "Musics": [
        {
          "name": "All Along the Watchtower - Remastered",
          "id": "1HipTbE3pVedq6OGGjxhWj"
        },
        {
          "name": "Are There Any More Real Cowboys?",
          "id": "7lN7MFOVh2raqbm1YCgxwF"
        },
        {
          "name": "Betty Lou's Got A New Pair Of Shoes",
          "id": "2r7SW7RFF4YIgL4s8cilD5"
        },
        {
          "name": "Bound For Glory",
          "id": "2W6zRsajzav7vvLHGrnDoD"
        },
        {
          "name": "Bright Lights, Big City",
          "id": "30dMflZgtCLLZa2O7xG2Jl"
        },
        {
          "name": "California Sunset",
          "id": "5nq875yJ1kJhOo1KYOwiDC"
        },
        {
          "name": "Computer Age",
          "id": "3flRo5nHxmiREMl2VuYwjq"
        },
        {
          "name": "Computer Cowboy",
          "id": "4JT4n2iCHQJpvnB9g6VPP6"
        },
        {
          "name": "Country Feedback - with guest Neil Young",
          "id": "3MNj8WKXCuduChszKpXw45"
        },
        {
          "name": "Cry, Cry, Cry",
          "id": "6uH7h6f89KG1nQ1CfexiYK"
        },
        {
          "name": "Everybody's Rockin'",
          "id": "0iMHZixnJMzbrT6rCc9ixI"
        },
        {
          "name": "Get Back To The Country",
          "id": "2VI9swm96JJ3JXX8rkpKcO"
        },
        {
          "name": "Harvest",
          "id": "7hpk3H8tjWh23edusCKW5O"
        },
        {
          "name": "Harvest Moon",
          "id": "5l9c6bJmzvftumhz4TMPgk"
        },
        {
          "name": "Heart Of Gold",
          "id": "6XDdmCAuodZfXtEgJcxpS2"
        },
        {
          "name": "Hippie Dream",
          "id": "2HaiRw4GHvSYQwMbkEsfH5"
        },
        {
          "name": "Hold On To Your Love",
          "id": "5wa3indxm38lz8wH4i0j4d"
        },
        {
          "name": "Jellyroll Man",
          "id": "03OR6Wrng07w7sdJCoh2br"
        },
        {
          "name": "Journey Through the Past",
          "id": "73uAQw29X3mrO1taWZaOvm"
        },
        {
          "name": "Just Like Tom Thumb's Blues - Remastered",
          "id": "0yooAzGi7j1BFEQmJHXDbc"
        }
      ],
      "position": 33
    },
    {
      "name": "Michael Jackson",
      "id": "3fMbdgg4jU18AjLCKBhRSm",
      "Musics": [
        {
          "name": "A Place With No Name",
          "id": "35SI5zFEhOeo4XDBMwS41S"
        },
        {
          "name": "Bad - 2012 Remaster",
          "id": "2gSNBigeWMVtY3QBIvPAEc"
        },
        {
          "name": "Beat It - Single Version",
          "id": "6pBM20jZldvNlbNcnwAX0y"
        },
        {
          "name": "Ben",
          "id": "3DUNaBEHqpXsrY7sXWlWpX"
        },
        {
          "name": "Billie Jean",
          "id": "6vR5u5b8JeRESx5nZaIWx6"
        },
        {
          "name": "Black or White",
          "id": "7EsjkelQuoUlJXEw7SeVV4"
        },
        {
          "name": "Chicago",
          "id": "5BKKy9fIJL5uM9fz1SnqyP"
        },
        {
          "name": "Don't Stop 'Til You Get Enough - Single Version",
          "id": "46eu3SBuFCXWsPT39Yg3tJ"
        },
        {
          "name": "Heal the World",
          "id": "7woW97CfcWaKtuC6W5BP2K"
        },
        {
          "name": "Hold My Hand",
          "id": "0pCyoA5o2uxUwIovECCziF"
        },
        {
          "name": "Hollywood Tonight",
          "id": "5ensPSgQkRM60i8ZH3S9wG"
        },
        {
          "name": "Human Nature",
          "id": "35lAjvsvS9k9HHuP1fjDT8"
        },
        {
          "name": "Love Never Felt so Good",
          "id": "0S5EEpFAHcT7cm5XOASc29"
        },
        {
          "name": "Loving You",
          "id": "4T1JlEsHdrxGxBltSFe5yA"
        },
        {
          "name": "Man in the Mirror - 2012 Remaster",
          "id": "1kiNatIrwDusOZfR29W0LJ"
        },
        {
          "name": "Off the Wall",
          "id": "3zYpRGnnoegSpt3SguSo3W"
        },
        {
          "name": "One Day In Your Life",
          "id": "7C6Mnsbjnh2nLk7OGQFbdm"
        },
        {
          "name": "P.Y.T. (Pretty Young Thing)",
          "id": "5lA3pwMkBdd24StM90QrNR"
        },
        {
          "name": "Remember the Time",
          "id": "4jnFqNWeJCeCRHc4HCdxfd"
        },
        {
          "name": "Rock with You - Single Version",
          "id": "7oOOI85fVQvVnK5ynNMdW7"
        }
      ],
      "position": 34
    },
    {
      "name": "Madonna",
      "id": "6tbjWDEIzxoDsBA1FuhfPW",
      "Musics": [
        {
          "name": "4 Minutes - feat. Justin Timberlake And Timbaland",
          "id": "1oHClQEgDmmbcEx12Kc5nZ"
        },
        {
          "name": "American Pie",
          "id": "3afv9TL8ixr4T9VbiKnrwe"
        },
        {
          "name": "Bitch I'm Madonna",
          "id": "2Dt7p9YxqaHhZoIfo5sYwj"
        },
        {
          "name": "Celebration",
          "id": "5HktkLHDbjA6LTyRTBEzHy"
        },
        {
          "name": "Crazy For You",
          "id": "6B4oVElDIKRNcNUary0WG7"
        },
        {
          "name": "Devil Pray",
          "id": "13KfiQeisHCBaoNHOnfKg4"
        },
        {
          "name": "Erotica",
          "id": "1amRq1hFKK1vFCj2KNDfJV"
        },
        {
          "name": "Express Yourself",
          "id": "6ioBgySxoeQKALvAeLEmId"
        },
        {
          "name": "Frozen",
          "id": "2II03llydk4YnkBBvoYB3B"
        },
        {
          "name": "Get Together",
          "id": "1AQQ9DdpEemMVTHNz4eG9a"
        },
        {
          "name": "Ghosttown",
          "id": "3UlDPGQ8W5BspjacgHwefP"
        },
        {
          "name": "Girl Gone Wild",
          "id": "3ZfMci7n6qk9nRodX8BfIb"
        },
        {
          "name": "Give It 2 Me",
          "id": "59qPP8coY8EWIQ9nQDThui"
        },
        {
          "name": "Give Me All Your Luvin'",
          "id": "0QXtw4rDLQtpzqPS4uJbZJ"
        },
        {
          "name": "Holiday",
          "id": "4k6ktr10Hczmh55NY3LfJy"
        },
        {
          "name": "Hung Up",
          "id": "3850dYVgOFIXJh5U4BFEWH"
        },
        {
          "name": "Iconic",
          "id": "0xEIHeIi9Bz8sLpmFUuExb"
        },
        {
          "name": "Into The Groove",
          "id": "2m0M7YqCy4lXfedh18qd8N"
        },
        {
          "name": "Jump",
          "id": "5hmRhU6fWzH0NjYmfhHjhp"
        },
        {
          "name": "La Isla Bonita",
          "id": "6r8k1vznHrzlEKYxL4dZEe"
        }
      ],
      "position": 35
    },
    {
      "name": "Roy Orbison",
      "id": "0JDkhL4rjiPNEp92jAgJnS",
      "Musics": [
        {
          "name": "(All I Can Do Is) Dream You - Live Version",
          "id": "3K5qBAFO9tAyc5TNENxh2S"
        },
        {
          "name": "A Love So Beautiful",
          "id": "40w5KzJx6pS9J4hIEQDgIa"
        },
        {
          "name": "All I Have to Do Is Dream",
          "id": "2ka7jHZ7HSPelRrz0TQ7of"
        },
        {
          "name": "Blue Angel",
          "id": "2pZZAqrHtIY5A4TsE3gtsT"
        },
        {
          "name": "Blue Bayou",
          "id": "26p6GNIQfv9koDVD4rTouu"
        },
        {
          "name": "California Blue",
          "id": "5yqVF4y7dq6AgnNCHnHZEA"
        },
        {
          "name": "Candy Man",
          "id": "23c4cwGTt6ifXOoO4FlBRK"
        },
        {
          "name": "Claudette",
          "id": "5Ly6vIcs9boF5oLVP3XJM5"
        },
        {
          "name": "Crying",
          "id": "6eLL7QTdMWdhhG4i3jHDR9"
        },
        {
          "name": "Dream Baby (How Long Must I Dream)",
          "id": "2brxFq9YHrI4v6RGrocn5X"
        },
        {
          "name": "Go Go Go",
          "id": "5BLq5279PVGGE98RTALB7n"
        },
        {
          "name": "I Drove All Night",
          "id": "6U7QjXYOaLJ741cIWPBTyN"
        },
        {
          "name": "In Dreams",
          "id": "5YsyqcewwE0c1ukzHVciS3"
        },
        {
          "name": "In The Real World",
          "id": "0D22PG0awRmq6XlCicjRdO"
        },
        {
          "name": "It's Over",
          "id": "0a4jcrnAjE7BcOo6B0hdRV"
        },
        {
          "name": "Let's Make a Memory",
          "id": "36pIktQteJryMw6OqEleRq"
        },
        {
          "name": "Lonely Wine",
          "id": "6eEG9rbtwvNtDh5gAt9wtc"
        },
        {
          "name": "Love Hurts",
          "id": "2ASB279de3kSxmwZUwgo54"
        },
        {
          "name": "Oh, Pretty Woman",
          "id": "1hzJNnXtVKQ6BVyfDFSk1R"
        },
        {
          "name": "Only The Lonely (Know The Way I Feel)",
          "id": "6QvaX7a20WxA09euBzEE3r"
        }
      ],
      "position": 36
    },
    {
      "name": "John Lennon",
      "id": "4x1nvY2FN8jxqAFA0DA02H",
      "Musics": [
        {
          "name": "#9 Dream - 2010 - Remaster",
          "id": "4ZVWvCUwsOnIGmJMj71RkG"
        },
        {
          "name": "(Just Like) Starting Over",
          "id": "7qkW1FftvUU5S2P1eNEBjr"
        },
        {
          "name": "Beautiful Boy (Darling Boy)",
          "id": "1f1QPwS422JMbg2aRW66bw"
        },
        {
          "name": "Crippled Inside - 2010 - Remaster",
          "id": "5CG4RXjli90Zd1KDalPqeK"
        },
        {
          "name": "Gimme Some Truth - 2010 - Remaster",
          "id": "3d2oiHuHm3rftzRDPeL5LU"
        },
        {
          "name": "God - 2010 - Remaster",
          "id": "7kipZd4tWx6Mu8kBgB2Z2r"
        },
        {
          "name": "Happy Xmas (War Is Over) - 2010 Digital Remaster",
          "id": "3zJw3rugfpVrmBeDDnUYzy"
        },
        {
          "name": "Hold On - 2010 - Remaster",
          "id": "4bN43jYf41eIjJZ3UXQpuA"
        },
        {
          "name": "How Do You Sleep? - 2010 - Remaster",
          "id": "7xsr2OppItxPB4whucYr2G"
        },
        {
          "name": "How? - 2010 - Remaster",
          "id": "4k9pqSKBHYdTGjzNeRyQ0o"
        },
        {
          "name": "I Don't Wanna Be A Soldier Mama I Don't Wanna Die - 2010 - Remaster",
          "id": "16euYyM9iFZqOk3p9bnsEW"
        },
        {
          "name": "I Found Out - 2010 - Remaster",
          "id": "1EYzr2S8PJmqUsRMkX3cSP"
        },
        {
          "name": "I'm Losing You - 2010 - Remaster",
          "id": "34Uw8BqBmiEHDV5v7qmRo9"
        },
        {
          "name": "I'm Stepping Out - 2010 - Remaster",
          "id": "2RczkdKFniMSJpr1P6ApaS"
        },
        {
          "name": "Imagine - 2010 - Remaster",
          "id": "0YFgBDWjCK50VBt4qYezbj"
        },
        {
          "name": "Instant Karma! (We All Shine On) - 2010 - Remaster",
          "id": "2ZbFPXkcaYPq3tu1mLJkjk"
        },
        {
          "name": "Isolation - 2010 - Remaster",
          "id": "3sRQJYlA7P4oIRUwy8Im9r"
        },
        {
          "name": "It's So Hard - 2010 - Remaster",
          "id": "0YPyhXgtDks7BQozBSGCk4"
        },
        {
          "name": "Jealous Guy - 2010 - Remaster",
          "id": "3D9iV6cYkYJRAPFO6DRKIE"
        },
        {
          "name": "Look At Me - 2010 - Remaster",
          "id": "2yDEE5r9aIbSEWEgzfoFGu"
        }
      ],
      "position": 37
    },
    {
      "name": "David Bowie",
      "id": "0oSGxfWSnnOXhD2fKuz2Gy",
      "Musics": [
        {
          "name": "'Tis a Pity She Was a Whore",
          "id": "0v60rM2HLSatgUyVZDrLwm"
        },
        {
          "name": "Ashes To Ashes",
          "id": "1JHUxxd77M4ViaqJZfBdl0"
        },
        {
          "name": "Blackstar",
          "id": "0Fao855T3klV3REFRFHRF3"
        },
        {
          "name": "Cat People (Putting Out Fire) - Single Version, 2002 Remastered Version",
          "id": "3CD75JGmSMKA3RW5RtOwAz"
        },
        {
          "name": "Changes - 2015 Remastered Version",
          "id": "0LrwgdLsFaWh9VXIjBRe8t"
        },
        {
          "name": "China Girl - 1999 Remastered Version",
          "id": "1bki22ZoLCkqb0QIJ5PtJF"
        },
        {
          "name": "Come And Buy My Toys",
          "id": "5CksZVUVioYJ8B7aQYueQD"
        },
        {
          "name": "Diamond Dogs - 1999 Remastered Version",
          "id": "3MrxdpIOiuI9ahr3MfcYqA"
        },
        {
          "name": "Dollar Days",
          "id": "2AD2Xa5MkgF0xJBE1cFZwe"
        },
        {
          "name": "Fame (2007 Remastered)",
          "id": "7qVOasZcHa4faF1TqvPEKF"
        },
        {
          "name": "Five Years - 2012 Remastered Version",
          "id": "1JIzFhI9Lt5FyslawmHCBi"
        },
        {
          "name": "Girl Loves Me",
          "id": "6N9PAf91qP6aJIzT8bVoof"
        },
        {
          "name": "Golden Years - 1999 Remastered Version",
          "id": "1hlG7OWNQYhY01ZOd7JL6S"
        },
        {
          "name": "Heroes - 1998 Remastered Version",
          "id": "6Bh83dOo88nf6Ez5qHDsZe"
        },
        {
          "name": "It Ain't Easy - 2012 Remastered Version",
          "id": "0xRUwscEziliaWCsmq7n2w"
        },
        {
          "name": "Lady Stardust - 2012 Remastered Version",
          "id": "2ZWKuGuQ087pzwK4vO4E31"
        },
        {
          "name": "Lazarus",
          "id": "3Vn9oCZbdI1EMO7jxdz2Rc"
        },
        {
          "name": "Let's Dance (Single Version) [2002 Remastered Version]",
          "id": "4cVHMHgmWgudD399ZdhQ3L"
        },
        {
          "name": "Life On Mars? - 2015 Remastered Version",
          "id": "3ZE3wv8V3w2T2f7nOCjV0N"
        },
        {
          "name": "Modern Love - 1999 Remastered Version",
          "id": "7LyIoUsiMtelB1I0I4drEF"
        }
      ],
      "position": 38
    },
    {
      "name": "Simon & Garfunkel",
      "id": "70cRZdQywnSFp9pnc2WTCE",
      "Musics": [
        {
          "name": "A Heart In New York - Live",
          "id": "6IyU2LIPfopCfbWewM2UdO"
        },
        {
          "name": "America",
          "id": "6dfhF1BDGmhM69fnCb6wSC"
        },
        {
          "name": "April Come She Will",
          "id": "0djZ2ndRfAL69WYNra5jRC"
        },
        {
          "name": "Bookends Theme - Reprise",
          "id": "0Q3GpBYKy5Mx97TNBJVibl"
        },
        {
          "name": "Bridge over Troubled Water",
          "id": "5LFtkeNjLpZAey3Arj3h4M"
        },
        {
          "name": "Cecilia",
          "id": "6QhXQOpyYvbpdbyjgAqKdY"
        },
        {
          "name": "El Condor Pasa (If I Could)",
          "id": "1eN42Q7IWRzRBq8eW2Y2TE"
        },
        {
          "name": "For Emily, Whenever I May Find Her - Live Version",
          "id": "2P6F1jmMgSScpvx4aZvbmY"
        },
        {
          "name": "Homeward Bound",
          "id": "03VXrViYqJpdhuBEV0p0ak"
        },
        {
          "name": "Kathy's Song",
          "id": "4Acofe9hICRvyBTP5hFNk0"
        },
        {
          "name": "Me and Julio Down by the Schoolyard - Live",
          "id": "48mETFQ8n1Cq04eR32eyAn"
        },
        {
          "name": "Mrs. Robinson",
          "id": "3CJ60azPXtva8OdBsxSA7a"
        },
        {
          "name": "Scarborough Fair - Live",
          "id": "4e41Kd7WsZ0CfomJihS3GE"
        },
        {
          "name": "Scarborough Fair / Canticle - Single Version",
          "id": "4c8WhcYrLSdbsAFXi5XDFc"
        },
        {
          "name": "The 59th Street Bridge Song (Feelin' Groovy) - Live Version",
          "id": "0NvvimA48pRrKKYAUosAud"
        },
        {
          "name": "The Boxer",
          "id": "01cY7Cc7t5zPB64uj8NGxz"
        },
        {
          "name": "The Only Living Boy in New York",
          "id": "5MbXzXGbqobR8xPVPs8OXA"
        },
        {
          "name": "The Singleman Party Foxtrot",
          "id": "1GJ8Dy2jP4k9YhlSwiilB6"
        },
        {
          "name": "The Sound Of Silence",
          "id": "5ye2aEP0ICWJgJCsawlCp3"
        }
      ],
      "position": 39
    },
    {
      "name": "The Doors",
      "id": "22WZ7M8sxp5THdruNY3gXt",
      "Musics": [
        {
          "name": "Alabama Song (Whisky Bar)",
          "id": "3Qy9NQz8XuOhPqefJobvhd"
        },
        {
          "name": "Back Door Man",
          "id": "03By6gD02qhtvIQiK8KidK"
        },
        {
          "name": "Been Down So Long",
          "id": "1E7qCptwRPfvZrIDyDDgjh"
        },
        {
          "name": "Blue Sunday",
          "id": "2g3JAKjKruTL40VffoGLmg"
        },
        {
          "name": "Break On Through (To The Other Side)",
          "id": "6ToM0uwxtPKo9CMpbPGYvM"
        },
        {
          "name": "Breakn' A Sweat",
          "id": "1ShWHEgisDGPl9G3g85ANu"
        },
        {
          "name": "Cars Hiss By My Window",
          "id": "2Sjez1CwJv8Pz018CxKjWa"
        },
        {
          "name": "End Of The Night",
          "id": "09ezgACZuwWZt6CtQSSLRG"
        },
        {
          "name": "Five To One",
          "id": "5FlBGGwGuqYmqr0qeBWrxe"
        },
        {
          "name": "Hello, I Love You",
          "id": "3bWGaqVeYKMlLss40mPgNn"
        },
        {
          "name": "Hyacinth House",
          "id": "4nKmlUaUiUN4rpMGYnUPAu"
        },
        {
          "name": "I Looked At You",
          "id": "6vCLIvOIabRk1XQfMb6RXi"
        },
        {
          "name": "L.A. Woman",
          "id": "6DmfWj5kOa1fX8AwN9byOn"
        },
        {
          "name": "Light My Fire",
          "id": "5uvosCdMlFdTXhoazkTI5R"
        },
        {
          "name": "Love Her Madly",
          "id": "3MFFDRC4wTN9JNGtzXsZlN"
        },
        {
          "name": "Love Me Two Times",
          "id": "67HxeUADW4H3ERfaPW59ma"
        },
        {
          "name": "Love Street",
          "id": "5Q2Im8o4RthlAMkvUMYwGj"
        },
        {
          "name": "Moonlight Drive",
          "id": "0ja1dJM5gBTjk5U9wsMP9r"
        },
        {
          "name": "Peace Frog",
          "id": "5piJiL6aRhvrKBa9YuEfS9"
        },
        {
          "name": "People Are Strange",
          "id": "1Jmqubf9kGkWeYQXQKImL5"
        }
      ],
      "position": 40
    },
    {
      "name": "Van Morrison",
      "id": "44NX2ffIYHr6D4n7RaZF7A",
      "Musics": [
        {
          "name": "And It Stoned Me",
          "id": "3n5iUh2Z6P7cnWins22W0F"
        },
        {
          "name": "Astral Weeks",
          "id": "0vz4iTEfsp2lunsRJeMzjj"
        },
        {
          "name": "Baby Please Don't Go",
          "id": "5WUgOOaTk00PnksDekcgcg"
        },
        {
          "name": "Beside You",
          "id": "4rkSM3eGYRULHVbPR8q75t"
        },
        {
          "name": "Brand New Day",
          "id": "60SLSq9MlkbRunJKh0QZpa"
        },
        {
          "name": "Bright Side of the Road",
          "id": "4w4Shi3xjbZBDGuhLw5LsQ"
        },
        {
          "name": "Brown Eyed Girl",
          "id": "0Tr8K19XE1z6fAPhXbHfUX"
        },
        {
          "name": "Caravan",
          "id": "1US01PIcb3RFVrcN8mO8CS"
        },
        {
          "name": "Come Here My Love",
          "id": "0oILL1bs3bblg2Za8udkn9"
        },
        {
          "name": "Come Running",
          "id": "340k3JIT2OD06pNNpH38KW"
        },
        {
          "name": "Comfortably Numb - Live Version",
          "id": "2c4RgPnruaeh987CObhb9U"
        },
        {
          "name": "Crazy Love",
          "id": "5aN9SeqAtly2NriV7tMjrI"
        },
        {
          "name": "Cyprus Avenue",
          "id": "7msn6OoGXrNOaBGvIH1eqT"
        },
        {
          "name": "Days Like This",
          "id": "3xINh6YqkLfucEtjoa4x7D"
        },
        {
          "name": "Domino",
          "id": "0eti3iRdEgUxwcIcN2N9DY"
        },
        {
          "name": "Early In The Morning",
          "id": "3QP9B2esvPxLlbxaiNGQVK"
        },
        {
          "name": "Everyone",
          "id": "528kEbmXBOuMbxdn7YQAXx"
        },
        {
          "name": "Flesh & Bone (Dedicated to B.B. King)",
          "id": "37mWDk2nTyx0eon0AkdOKQ"
        },
        {
          "name": "Get On With The Show",
          "id": "1Gn1qvZQQOMGrNgQ4iLXij"
        },
        {
          "name": "Gloria - Stereo Version",
          "id": "1DKyFVzIh1oa1fFnEmTkIl"
        }
      ],
      "position": 41
    },
    {
      "name": "Sly Stone",
      "id": "6hA6GJ2yJA08ifsAplkUr0",
      "Musics": [
        {
          "name": "(I Want to Take You) Higher",
          "id": "2LDsTsFUyxGP030iyGkjOS"
        },
        {
          "name": "Back On The Right Track",
          "id": "6DwnTaObq6SqoTh1d5BoaI"
        },
        {
          "name": "Blood Thicker Than Mud \"Family Affair\"",
          "id": "3zfW2ivcjOsiNG0XtEQLmr"
        },
        {
          "name": "Dance To The Music (feat. Ray Manzarek)",
          "id": "653FP0hReV2nWNPD9tCWsc"
        },
        {
          "name": "Everyday People",
          "id": "2RLuqUev3PRFMXvq0EdrN3"
        },
        {
          "name": "Family Affair",
          "id": "6M7P1A5ZknEdovAINZH6CY"
        },
        {
          "name": "Get Away",
          "id": "7d7Um5UfnxdEdqGUNKW1jm"
        },
        {
          "name": "Get Back - Backing Track Takes 2 & 3",
          "id": "2VfwIyC1O0cY2LvF0NfpV2"
        },
        {
          "name": "Ha Ha, Hee Hee",
          "id": "4HZiRcqw6tHCRqKc3TWqVa"
        },
        {
          "name": "Hand Of Love - Demo Version",
          "id": "6Bqif4gKS2otM3rqSllKiE"
        },
        {
          "name": "High, Y'all",
          "id": "3AH4CbeiBlEIW8l2FLT0b3"
        },
        {
          "name": "His Eye Is On the Sparrow",
          "id": "34VfodiZLdRQYvtWaRlv7A"
        },
        {
          "name": "Hobo Ken",
          "id": "05rWcZGOkWdfcQY3mxVolj"
        },
        {
          "name": "Hoboken",
          "id": "1zWw8VPkU4Bf5TqUDoU5c5"
        },
        {
          "name": "Hot Fun in the Summertime",
          "id": "1rN0Dm4ukY48rchGcQ7ZC9"
        },
        {
          "name": "I Can't Turn You Loose",
          "id": "4L3yyfduwJSCBUvr1Vu4Nq"
        },
        {
          "name": "If It's Not Addin' Up",
          "id": "5YzGWvl0O1hHQMEbsUZoRv"
        },
        {
          "name": "In Other Words - Demo Version",
          "id": "4k8LCMzfJB1BaC6swzaewR"
        },
        {
          "name": "In The Still Of The Night",
          "id": "09Y7kg8PfEEWvErvFRvDWV"
        },
        {
          "name": "In da Kar (feat. Sly Stone) - EFUNK Mix",
          "id": "7teqhAHxyf0ViUUtdR4MPP"
        }
      ],
      "position": 42
    },
    {
      "name": "Public Enemy",
      "id": "6Mo9PoU6svvhgEum7wh2Nd",
      "Musics": [
        {
          "name": "911 Is A Joke",
          "id": "5zpmJnU3q9LRl6ZvHe8mWY"
        },
        {
          "name": "Black Steel In The Hour Of Chaos",
          "id": "06uaaWpCUgZHs6mxgednYw"
        },
        {
          "name": "Bring Tha Noize",
          "id": "2mandsmpXbKQRQnvk82U8l"
        },
        {
          "name": "Bring The Noise",
          "id": "2bKNjAVYsbJ35N2OXFfAxO"
        },
        {
          "name": "Bring The Noise Remix - Benny Benassi Pump - Kin Edit",
          "id": "2lh9rnGhsmj8B7W1EBrzaJ"
        },
        {
          "name": "By The Time I Get To Arizona",
          "id": "7I9Hv038ISyj6LTteRlbg7"
        },
        {
          "name": "Can't Truss It",
          "id": "54CT521CBzQ0HGOjs7FkKV"
        },
        {
          "name": "Don't Believe The Hype",
          "id": "56hyMlVcfBJIBgSmmZM3qE"
        },
        {
          "name": "Fight The Power",
          "id": "1Eia9YQnwl2t4gXAsA6qIL"
        },
        {
          "name": "Give It Up",
          "id": "2uWoy80sBB8a59nh0cDSe1"
        },
        {
          "name": "Give Peace A Damn",
          "id": "3n4d3Ru8sIMhz9BPCQK5Ej"
        },
        {
          "name": "He Got Game",
          "id": "7aRGb3vZGMLNpK2PEdUjdA"
        },
        {
          "name": "Honky Talk Rules",
          "id": "2OBxnA5ibDUkhzoX7O5SdS"
        },
        {
          "name": "I Shall Not Be Moved",
          "id": "3XHbjzVuRxkc28o0gOnewi"
        },
        {
          "name": "Lost At Birth",
          "id": "2r1eC2AGYfamm0CpFLSC3G"
        },
        {
          "name": "Man Plans God Laughs",
          "id": "1smcTA0tK9hBy9t4KXyLg3"
        },
        {
          "name": "Me To We",
          "id": "70U7RZwDzbuyB5SDNmBQ7M"
        },
        {
          "name": "Mine Again",
          "id": "6ggMu9jfPoeGGXCOe2N7iZ"
        },
        {
          "name": "No Sympathy From The Devil",
          "id": "3ZZPvl01C51x7qYpl2FXQ4"
        },
        {
          "name": "Prophets Of Rage",
          "id": "3BL2YvczxP1fNotb2nzNBj"
        }
      ],
      "position": 43
    },
    {
      "name": "The Byrds",
      "id": "1PCZpxHJz7WAMF8EEq8bfc",
      "Musics": [
        {
          "name": "5D (Fifth Dimension)",
          "id": "6QZfj7u76JcewmSARFVUmr"
        },
        {
          "name": "All I Really Want to Do",
          "id": "1MI0O2mwTpdwkZpfWz4J7o"
        },
        {
          "name": "Ballad of Easy Rider",
          "id": "3LfZ6EezCnuMkBVV31IjjY"
        },
        {
          "name": "Chestnut Mare",
          "id": "1I0M5Zx0IQ0iQDYhXABAg5"
        },
        {
          "name": "Chimes of Freedom",
          "id": "1WEuSuC0tJquFpf2JiMjh7"
        },
        {
          "name": "Cowgirl In The Sand",
          "id": "2U0iigw8ff589GR2hRGUV1"
        },
        {
          "name": "Draft Morning",
          "id": "33zGvjukiRoJgW6JWY0FMo"
        },
        {
          "name": "Eight Miles High",
          "id": "5v3utF8InHZKd8JZJK5rCx"
        },
        {
          "name": "Everybody's Been Burned - Single Version",
          "id": "2sKXj3gEdILnKDMV3D0htZ"
        },
        {
          "name": "Full Circle",
          "id": "0OQTIY7qPwyufiVZV3XIYi"
        },
        {
          "name": "Get to You",
          "id": "0Hx3e65pcMUTQPfacGzWXb"
        },
        {
          "name": "Goin' Back",
          "id": "6mM3QPK502fHwOYaj6ELmm"
        },
        {
          "name": "Have You Seen Her Face",
          "id": "6oRNqIZzxNdpYlappmxrGR"
        },
        {
          "name": "Here Without You",
          "id": "07gsAWyHNZA4pUpJGDIqOj"
        },
        {
          "name": "Hey Joe (Where You Gonna Go)",
          "id": "2cbzb9QLrv4B3Ch9s4G0YB"
        },
        {
          "name": "Hickory Wind",
          "id": "3YBTxokhuaszeWCOXC7FQn"
        },
        {
          "name": "I Am a Pilgrim",
          "id": "5HU3KDpJqqqmV9AWoBHToc"
        },
        {
          "name": "I Knew I'd Want You",
          "id": "27e6cMePYD0tleccrEMyHi"
        },
        {
          "name": "I See You",
          "id": "0kSJXMXa9JSWovwenDb4C3"
        },
        {
          "name": "I'll Feel a Whole Lot Better",
          "id": "2hIGz0CXlqA2ukeuUl8DYP"
        }
      ],
      "position": 44
    },
    {
      "name": "Janis Joplin",
      "id": "4NgfOZCL9Ml67xzM0xzIvC",
      "Musics": [
        {
          "name": "A Woman Left Lonely",
          "id": "5NXI6TWg0mQRmbGPHzkoHk"
        },
        {
          "name": "All Is Loneliness - Live",
          "id": "7AQD7uDsoBbVE9gk0Rb2pu"
        },
        {
          "name": "As Good As You've Been to This World",
          "id": "40kOux1AO6LNyUz2HXeFmr"
        },
        {
          "name": "Ball And Chain - Live",
          "id": "4nERgZjCyprmOCtdGNIRTt"
        },
        {
          "name": "Buried Alive In the Blues",
          "id": "1irx6ITISFfwiSqZuBGzSf"
        },
        {
          "name": "Bye, Bye Baby - Live",
          "id": "4S8F6YdYmqk4F2yEku59WM"
        },
        {
          "name": "Careless Love",
          "id": "0pbzWVS48QzoXkOewwpaDE"
        },
        {
          "name": "Cry Baby",
          "id": "3L60Vu9qmY6fg2QroRIxgi"
        },
        {
          "name": "Down On Me",
          "id": "3sAhDPCuInup5oVrNZvc50"
        },
        {
          "name": "Ego Rock - Live",
          "id": "5sCNS9a5UWmKCtUUu6W5uD"
        },
        {
          "name": "Flower In the Sun - Live",
          "id": "1711FzbczJw1BJ8xm1etox"
        },
        {
          "name": "Get It While You Can",
          "id": "3dOfHE5J4Qsj1hJ35vnfn4"
        },
        {
          "name": "Half Moon",
          "id": "2bD8JWzDBOnSeUcsjVU2SD"
        },
        {
          "name": "Kozmic Blues",
          "id": "1cTrWlx7OSaJf3pLpiYRRR"
        },
        {
          "name": "Little Girl Blue",
          "id": "2mSw3CffxXAg5X3pekE99K"
        },
        {
          "name": "Maybe",
          "id": "0ObQpi3TUFNRii58x5gnL8"
        },
        {
          "name": "Me and Bobby McGee",
          "id": "1IqFh00G2kvvMm8pRMpehA"
        },
        {
          "name": "Mercedes Benz",
          "id": "2rsDk1qOYZGr8bqsXkoRV1"
        },
        {
          "name": "Move Over",
          "id": "2bD9x9kN4wYyVoyckeqlLk"
        },
        {
          "name": "My Baby",
          "id": "21VU4WIu7EXD68EWGzPUn7"
        }
      ],
      "position": 45
    },
    {
      "name": "Patti Smith",
      "id": "0vYkHhJ48Bs3jWcvZXvOrP",
      "Musics": [
        {
          "name": "After the Gold Rush",
          "id": "6aqJhVpN3T3n2SppOM0Vh5"
        },
        {
          "name": "Amerigo",
          "id": "1tZ4JHHtnELQC3smRIkJ2q"
        },
        {
          "name": "April Fool",
          "id": "53eJ84ALjlKpU2A2OpohCN"
        },
        {
          "name": "Ask the Angels - Remastered",
          "id": "6BmAr1i0Jnk8ztzRVQHyEi"
        },
        {
          "name": "Banga",
          "id": "5uttgE8978LpIhR01mmdhN"
        },
        {
          "name": "Because the Night",
          "id": "1akJ5qN3I65p5QPSwo9NEJ"
        },
        {
          "name": "Birdland",
          "id": "4UcCvuacrweynfWohap8NR"
        },
        {
          "name": "Break It Up",
          "id": "5UoBmpb4VHNBbKjxmL8WGe"
        },
        {
          "name": "Capitol Letter - From “The Hunger Games: Catching Fire\"/Soundtrack",
          "id": "2x0MmGepbG3Z7QNDasRtDO"
        },
        {
          "name": "Changing of the Guards",
          "id": "2NUDgu1fFrFHSKda4IErpr"
        },
        {
          "name": "Dancing Barefoot - Remastered",
          "id": "4kPSjEg8u1U4pg2dHHMmtf"
        },
        {
          "name": "Elegie",
          "id": "1s20rDPeaWhdDRZGVXOlb2"
        },
        {
          "name": "Everybody Wants to Rule the World",
          "id": "4LXwDXCJnTPoWexw3BJFVZ"
        },
        {
          "name": "Frederick - Remastered",
          "id": "1AWSemPzuGu4A9lVhSsFWJ"
        },
        {
          "name": "Free Money",
          "id": "1wP1qnWy0cZWxnbWkzf9La"
        },
        {
          "name": "Ghost Dance",
          "id": "3JRoZqOoTuQu6pI1prK7QC"
        },
        {
          "name": "Gimme Shelter",
          "id": "1ENXYUosf6ifDYaIAj2trr"
        },
        {
          "name": "Gloria - Remastered",
          "id": "6eisGT6VfhqbjT35pshOdN"
        },
        {
          "name": "Gloria: In Excelsis Deo",
          "id": "272Z4tzaSMMcgrZ0R494S2"
        },
        {
          "name": "Kimberly",
          "id": "0iI8LriXKjg47IxjNCWuwz"
        }
      ],
      "position": 46
    },
    {
      "name": "Run-D.M.C",
      "id": "3CQIn7N5CuRDP8wEI7FiDA",
      "Musics": [
        {
          "name": "Beats to the Rhyme",
          "id": "7kUFkzmFsSIi02RTO7wAQF"
        },
        {
          "name": "Crown Royal",
          "id": "4RNbW9Npfw2Dxg8NyErrM9"
        },
        {
          "name": "Down With the King",
          "id": "2oSPru8bef0EMhF9tvMSLn"
        },
        {
          "name": "Hard Times",
          "id": "0AEDeskXKRo2E0r7ISoMAy"
        },
        {
          "name": "Here We Go - Live At The Funhouse",
          "id": "6rs1Jt3bqNdPN01kQeAXX5"
        },
        {
          "name": "Hollis Crew - Krush-Groove 2",
          "id": "2DYVOx818b5iQ0YRGrSMst"
        },
        {
          "name": "Is It Live",
          "id": "40rt5qcE4k671lIT3RSH1G"
        },
        {
          "name": "It's Like That",
          "id": "5PoTFkXUUQFX552Mm4TfcU"
        },
        {
          "name": "It's Over - Club Mix/Dirty Version",
          "id": "4HeMzPXfYH27NjgiGznL78"
        },
        {
          "name": "It's Tricky",
          "id": "5RxgnPu8T7Ymj7Ee34mg4V"
        },
        {
          "name": "Jam-Master Jay",
          "id": "7fjxc2JxSx51qrydS7jXTU"
        },
        {
          "name": "King of Rock",
          "id": "0zhnWXX1Aenpsp86wvXZqJ"
        },
        {
          "name": "Mary, Mary",
          "id": "3jmbbFdiHvAf1EGmveAHkU"
        },
        {
          "name": "Me, Myself & My Microphone",
          "id": "4SD1dYQDQkXQ0EByuJBpns"
        },
        {
          "name": "My Adidas",
          "id": "6LdpVTJzigyi2vbKe8mZAr"
        },
        {
          "name": "Ooh, Watcha Gonna Do",
          "id": "77dXj7kVFbOQABUR0ghQyI"
        },
        {
          "name": "Pause",
          "id": "2Yafheh711uZNWM4CuM5Nj"
        },
        {
          "name": "Peter Piper",
          "id": "4TiFdcu6NolFKFwukcbdze"
        },
        {
          "name": "Queens Day",
          "id": "3Et1tiy9byYDJJ7q6xOBfb"
        },
        {
          "name": "Raising Hell",
          "id": "1zAfj2rXxddGb8Dhnwxue8"
        }
      ],
      "position": 47
    },
    {
      "name": "Elton John",
      "id": "3PhoLpVuITZKcymswpck5b",
      "Musics": [
        {
          "name": "Are You Ready For Love - '79 Version Radio Edit",
          "id": "3YdJzolD4HFvWGioELW2pC"
        },
        {
          "name": "Bennie And The Jets",
          "id": "2VKNYeuBgyr5MqVsiwcUfE"
        },
        {
          "name": "Can You Feel The Love Tonight",
          "id": "0a0iz0KdXtGLrwosNsIwMJ"
        },
        {
          "name": "Candle In The Wind",
          "id": "6rDSJEMDFEaT7pr8J9jND1"
        },
        {
          "name": "Circle Of Life",
          "id": "7sZYaGhb4hGlnF4uCBGeTj"
        },
        {
          "name": "Crocodile Rock",
          "id": "4v6koasIv1ksU2P9iWqfRV"
        },
        {
          "name": "Daniel",
          "id": "69C1ktfJGeTEXoniSMyNnR"
        },
        {
          "name": "Don't Go Breaking My Heart",
          "id": "0bV4WoGRzmYV6y7OojZvqr"
        },
        {
          "name": "Don't Let The Sun Go Down On Me",
          "id": "6YFbJW9ieQHClBf9nFnAd2"
        },
        {
          "name": "Empty Garden (Hey Hey Johnny) - Remastered 2003",
          "id": "3MJolSHZn6mBsJr2SCiYjj"
        },
        {
          "name": "Goodbye Yellow Brick Road",
          "id": "3KinT6gAqo12KDa2MNGDVy"
        },
        {
          "name": "I Guess That's Why They Call It The Blues",
          "id": "0R4tfzZcfjibuHP9WHKATM"
        },
        {
          "name": "I'm Still Standing",
          "id": "5fwP61Nmo5xXYIjO9XEWqb"
        },
        {
          "name": "Nikita",
          "id": "63V73lKMKA2NEBYSLfLgkq"
        },
        {
          "name": "Rocket Man (I Think It's Going To Be A Long Long Time)",
          "id": "2zvot9pY2FNl1E94kc4K8M"
        },
        {
          "name": "Sacrifice",
          "id": "0yhDca7Z4TOiEejtAx6R3g"
        },
        {
          "name": "Sad Songs (Say So Much) - Single Edit",
          "id": "0qp8E0VD2lbgrYghytixMr"
        },
        {
          "name": "Save Rock And Roll",
          "id": "6SFTYQSczxhBNKR5bYjGMD"
        },
        {
          "name": "Skyline Pigeon - Piano Version",
          "id": "2nDz6midZhmCgE33RUKtOA"
        },
        {
          "name": "Something About The Way You Look Tonight - Edit Version",
          "id": "3hswKEW1guWZKsKZN8cFT4"
        }
      ],
      "position": 48
    },
    {
      "name": "The Band",
      "id": "4vpDg7Y7fU982Ds30zawDA",
      "Musics": [
        {
          "name": "A Hard Rain's A-Gonna Fall",
          "id": "7ny2ATvjtKszCpLpfsGnVQ"
        },
        {
          "name": "All Along the Watchtower",
          "id": "0Fnb2pfBfu0ka33d6Yki17"
        },
        {
          "name": "Autumn Leaves",
          "id": "3tKCYhzgnMEExDtetcZknP"
        },
        {
          "name": "Ballad of a Thin Man",
          "id": "0f5N14nB8xi0p3o4BlVvbx"
        },
        {
          "name": "Blowin' In the Wind",
          "id": "18GiV1BaXzPVYpp9rmOg0E"
        },
        {
          "name": "Changing of the Guards - Remastered",
          "id": "2vVpjZxlSiqR5wr2YeZPB2"
        },
        {
          "name": "Comeback Kid",
          "id": "1JIonCKtbUUkRIeEJrQBGU"
        },
        {
          "name": "Desolation Row",
          "id": "4n1ZGm3TxYmoYe1YR8cMus"
        },
        {
          "name": "Don't Think Twice, It's All Right",
          "id": "2WOjLF83vqjit2Zh4B69V3"
        },
        {
          "name": "Forever Young - Slow Version",
          "id": "4yWl0tnEanf3zmZzl9kbQn"
        },
        {
          "name": "Girl from the North Country",
          "id": "739sLmfUkVFoyPtb0C3263"
        },
        {
          "name": "Highway 61 Revisited",
          "id": "6os5B6xjuke9YfBKH3tu1e"
        },
        {
          "name": "Hurricane",
          "id": "1lqMLr9Wj7SM2F9AikGcxN"
        },
        {
          "name": "I Shall be Released - Take 1",
          "id": "0gEMdjLNCMiMla2Auz43iL"
        },
        {
          "name": "I Want You",
          "id": "7tJQ4Ekp2vN3NlI3vJJW3v"
        },
        {
          "name": "I'm A Fool To Want You",
          "id": "6PQ30208LWUAx5R5cYeIJ6"
        },
        {
          "name": "If I Die Young",
          "id": "4aY0tZIaboefmkBEsjAovI"
        },
        {
          "name": "It Ain't Me Babe",
          "id": "5nbNWAfT1S6V1vqj3snHxS"
        },
        {
          "name": "It's All over Now, Baby Blue",
          "id": "4EgKcG7aswxVfQEqa3dl8S"
        },
        {
          "name": "It's Alright, Ma (I'm Only Bleeding)",
          "id": "5Oer8yskMaCGXwGSfM7xr9"
        }
      ],
      "position": 49
    },
    {
      "name": "Pink Floyd",
      "id": "0k17h0D3J5VfsdmQ1iZtE9",
      "Musics": [
        {
          "name": "Another Brick in the Wall, (Pt. 2) - Live",
          "id": "1DuLUalpWPKR9ryXEz1TK7"
        },
        {
          "name": "Another Brick in the Wall, Pt. 1",
          "id": "7K6xMPtAjTuLPNlJMLf5bS"
        },
        {
          "name": "Another Brick in the Wall, Pt. 2",
          "id": "4gMgiXfqyzZLMhsksGmbQV"
        },
        {
          "name": "Another Brick in the Wall, Pt. 3",
          "id": "5A7eooPKJHtr0UJmatjH4a"
        },
        {
          "name": "Any Colour You Like",
          "id": "6FBPOJLxUZEair6x4kLDhf"
        },
        {
          "name": "Brain Damage",
          "id": "05uGBKRCuePsf43Hfm0JwX"
        },
        {
          "name": "Breathe (In the Air)",
          "id": "2ctvdKmETyOzPb2GiJJT53"
        },
        {
          "name": "Comfortably Numb",
          "id": "5HNCy40Ni5BZJFw1TKzRsC"
        },
        {
          "name": "Coming Back to Life",
          "id": "1bQ4zbP8Fo0qAePTSOfYji"
        },
        {
          "name": "Dogs",
          "id": "2jvuMDqBK04WvCYYz5qjvG"
        },
        {
          "name": "Eclipse",
          "id": "1tDWVeCR9oWGX8d5J9rswk"
        },
        {
          "name": "Empty Spaces",
          "id": "5yMyLZu4wPvWcbLFiRhYVM"
        },
        {
          "name": "Goodbye Blue Sky",
          "id": "0ESdtt9cjGZUkUbaubSrv2"
        },
        {
          "name": "Have a Cigar",
          "id": "3CmHvyZQQAGkKkTjTBFWN6"
        },
        {
          "name": "Hey You",
          "id": "7F02x6EKYIQV3VcTaTm7oN"
        },
        {
          "name": "High Hopes",
          "id": "5a4MgIUSf9K8wXLSm6xPEx"
        },
        {
          "name": "In the Flesh?",
          "id": "24YmWQgunJGAU8El3ndkyn"
        },
        {
          "name": "Is There Anybody Out There?",
          "id": "5HAjss9faCAowGY8dM24r6"
        },
        {
          "name": "Learning to Fly - Live",
          "id": "60uvkaYFgUaw862cvTgGM5"
        },
        {
          "name": "Lost for Words",
          "id": "4Ev1LZ4uzjnSvDHpgdyBZK"
        }
      ],
      "position": 50
    },
    {
      "name": "Queen",
      "id": "1dfeR4HaWDbWqFHLkxsg1d",
      "Musics": [
        {
          "name": "A Kind Of Magic - Remastered 2011",
          "id": "5RYLa5P4qweEAKq5U1gdcK"
        },
        {
          "name": "Another One Bites The Dust - Remastered 2011",
          "id": "5vdp5UmvTsnMEMESIF2Ym7"
        },
        {
          "name": "Bohemian Rhapsody - Remastered 2011",
          "id": "1AhDOtG9vPSOmsWgNW0BEY"
        },
        {
          "name": "Crazy Little Thing Called Love - Remastered 2011",
          "id": "2zCs0vLKiRO0ctaAji81g5"
        },
        {
          "name": "Doing All Right - BBC Session / February 5th 1973, Langham 1 Studio",
          "id": "5yCc7rZJqIf0S0ocdbdiks"
        },
        {
          "name": "Don't Stop Me Now - Remastered 2011",
          "id": "5T8EDUDqKcs6OSOwEsfqG7"
        },
        {
          "name": "Fat Bottomed Girls - 2011 Remaster",
          "id": "6IAVxNFi1W88UhDeyvOsdo"
        },
        {
          "name": "Flick Of The Wrist - BBC Session / October 16th 1974, Maida Vale 4 Studio",
          "id": "2mhapLOReKm1DYoaQWOYjd"
        },
        {
          "name": "Great King Rat - BBC Session / December 3rd 1973, Langham 1 Studio",
          "id": "2rwEPHOai3k4O9C4ccsG0P"
        },
        {
          "name": "I Want To Break Free - Remastered 2011",
          "id": "4ue5ET9msGNJSO6sSbrCVE"
        },
        {
          "name": "I Was Born To Love You",
          "id": "6j72nKKRKnGTq7HBMyuvfB"
        },
        {
          "name": "It's Late - BBC Session / October 28th 1977, Maida Vale 4 Studio",
          "id": "5e1ChflY7qpMxkhuc1ZHmX"
        },
        {
          "name": "Keep Yourself Alive - BBC Session / February 5th 1973, Langham 1 Studio",
          "id": "1OBNxuT3jiwCoZUQC6BOxB"
        },
        {
          "name": "Killer Queen - Remastered 2011",
          "id": "1CnN9udhDokm7lARZjMji2"
        },
        {
          "name": "Liar - BBC Session / February 5th 1973, Langham 1 Studio",
          "id": "2UmxDvAuojcNhRExLB0Vtn"
        },
        {
          "name": "Love Of My Life - Live At The Nepstadion, Budapest / 1986",
          "id": "4jtYkaxeQg2yjPRZQttd9I"
        },
        {
          "name": "Modern Times Rock 'n' Roll - BBC Session / April 3rd 1974, Langham 1 Studio",
          "id": "6PJxLgEyS8rFWYEhDVj4vo"
        },
        {
          "name": "My Fairy King - BBC Session / February 5th 1973, Langham 1 Studio",
          "id": "74eeAaPoGPuaMKpFria6Ff"
        },
        {
          "name": "My Melancholy Blues - BBC Session / October 28th 1977, Maida Vale 4 Studio",
          "id": "55DkO4Weza29g64sqnjAcD"
        },
        {
          "name": "Nevermore - BBC Session / April 3rd 1974, Langham 1 Studio",
          "id": "3T39E1qdNDLQWGEEwz6OOD"
        }
      ],
      "position": 51
    },
    {
      "name": "The Allman Brothers Band",
      "id": "4wQ3PyMz3WwJGI5uEqHUVR",
      "Musics": [
        {
          "name": "Ain't Wastin' Time No More",
          "id": "4npb7kcdUuMOHfhqksIPjW"
        },
        {
          "name": "Back Where It All Begins",
          "id": "4hRSKLxWptKUvKF7wr60B2"
        },
        {
          "name": "Black Hearted Woman",
          "id": "0dlp6fhc5Y5PpdNcStplfa"
        },
        {
          "name": "Blue Sky",
          "id": "2o4Tod9IvafYeZYwENqW0t"
        },
        {
          "name": "Come And Go Blues",
          "id": "7KjKG1NP2khNspYTBt3kkb"
        },
        {
          "name": "Don't Keep Me Wonderin'",
          "id": "0w2NGBUvFbLElii2b187vE"
        },
        {
          "name": "Don't Want You No More",
          "id": "2SK79WEvm89UQrSc5qLFZT"
        },
        {
          "name": "Done Somebody Wrong",
          "id": "6k2Jk11AetkObOjXR0ZYmI"
        },
        {
          "name": "Dreams",
          "id": "64JxkGUPETR3kOljSRdjCn"
        },
        {
          "name": "End of the Line - Live",
          "id": "52NJGriAZ5lhYdXm6fUTui"
        },
        {
          "name": "Good Clean Fun",
          "id": "7cIVAikDoNoEOjXKMWMFzZ"
        },
        {
          "name": "In Memory Of Elizabeth Reed",
          "id": "7bFHmWYw8ceKkkvuF7bI0m"
        },
        {
          "name": "It's Not My Cross To Bear",
          "id": "1VwpFPbjDWBZTWYxmPYjkz"
        },
        {
          "name": "Jelly Jelly",
          "id": "6Df3quv2Q4zdvZjP4QUzxz"
        },
        {
          "name": "Jessica",
          "id": "70MFA4POvFyx1rI4YZ1WxA"
        },
        {
          "name": "Little Martha",
          "id": "1fJJYRE6BM1ZWyyGCMD6nT"
        },
        {
          "name": "Melissa",
          "id": "0OKZFG2seuYwgqlFb01wHI"
        },
        {
          "name": "Midnight Blues - Live",
          "id": "3IS2cWiw7lRj7bfU5glWQP"
        },
        {
          "name": "Midnight Rider",
          "id": "1arHyeWHqZ9qqK4n5wnlhJ"
        },
        {
          "name": "No One to Run With",
          "id": "10Q26DXQAlvQlnKRdZJgec"
        }
      ],
      "position": 52
    },
    {
      "name": "Howlin Wolf",
      "id": "0Wxy5Qka8BN9crcFkiAxSR",
      "Musics": [
        {
          "name": "Baby How Long",
          "id": "44ap7MgMJ9Ij3ILReK4eM7"
        },
        {
          "name": "Back Door Man",
          "id": "4ZusRoGIWjLquOttp4ryR6"
        },
        {
          "name": "Built For Comfort",
          "id": "08hQnOkNBRd1N5fLBOTNAa"
        },
        {
          "name": "Do the Do (feat. Eric Clapton)",
          "id": "5h6AARv2l5pluEVF29X2AZ"
        },
        {
          "name": "Down In The Bottom - Single Version",
          "id": "3uSaPATnJLwT50RHRiCcOA"
        },
        {
          "name": "Evil (Is Going On)",
          "id": "60WtztwjlLDXeT6t6yP86R"
        },
        {
          "name": "Forty Four",
          "id": "61Cu2UE7aVSYzaiAaz8cBj"
        },
        {
          "name": "Goin' Down Slow",
          "id": "3sCZiskTgJUvL8GebuXsnD"
        },
        {
          "name": "Hidden Charms",
          "id": "1krLahHgF5X2ry7sRQZIWj"
        },
        {
          "name": "Highway My Friend",
          "id": "218nSryj1JAcQMoMlRfKEq"
        },
        {
          "name": "How Many More Years",
          "id": "5Nyrn118i2sI3lC8JgCHUy"
        },
        {
          "name": "Howlin' For My Darlin'",
          "id": "2VpTJHJUsx8py8CRehh7Rl"
        },
        {
          "name": "I Ain't Superstitious",
          "id": "65oK0b1m2PYL2PvO2PJDyH"
        },
        {
          "name": "I Asked For Water",
          "id": "3CIuOdEUhazCxvkqPcOe4S"
        },
        {
          "name": "I Have a Little Girl",
          "id": "75K07wqT8gOjzFXaZbvGVy"
        },
        {
          "name": "I'm the Wolf",
          "id": "4UxpRsVhpnBq1Rw1iixPsI"
        },
        {
          "name": "Joy To My Soul - 1994 Chess Collectibles Version",
          "id": "7tlO8bOSXwApNxY3sp0CUG"
        },
        {
          "name": "Killing Floor",
          "id": "1CpdhnzOw4nIA9q7GTCgGC"
        },
        {
          "name": "Little Red Rooster",
          "id": "5L7Wl4r0Py9hjmOx5umDfY"
        },
        {
          "name": "Moanin' At Midnight",
          "id": "3ME6MCUdViTYXJLLU7Yagd"
        }
      ],
      "position": 53
    },
    {
      "name": "Eric Clapton",
      "id": "6PAt558ZEZl0DmdXlnjMgD",
      "Musics": [
        {
          "name": "Alabama Woman Blues",
          "id": "6oLPkR1ENgOiPNYTz2oxJi"
        },
        {
          "name": "Anyday - Live in San Diego",
          "id": "2caCEBZjBIa2HhNv0Yniru"
        },
        {
          "name": "Before You Accuse Me",
          "id": "4hmzXn5PlyspAkeT7RSEAV"
        },
        {
          "name": "Can't Let You Do It",
          "id": "2UQLszxBF4yFMO1JFFR1eM"
        },
        {
          "name": "Catch The Blues",
          "id": "2M1QYSpTknEWX4WvpFZm0N"
        },
        {
          "name": "Change The World",
          "id": "6BQNJ0JFKh8sWjQLI6Zudi"
        },
        {
          "name": "Cocaine",
          "id": "6hDegaGv8VwBoMhGqoPfxR"
        },
        {
          "name": "Got To Get Better in a Little While - Live in San Diego",
          "id": "4oC9U4zrIq9B86Ez26B3Qt"
        },
        {
          "name": "Help The Poor",
          "id": "2W7h8QWIcCarT7hPNokBnF"
        },
        {
          "name": "Hey Hey",
          "id": "7d8L6hQ8VROqzjjjd35NcK"
        },
        {
          "name": "I Shot The Sheriff",
          "id": "40NZobC8kyAi9RgVYS0Bn9"
        },
        {
          "name": "I Will Be There",
          "id": "1IY5F9GSfoSOH5CNzE0L7K"
        },
        {
          "name": "It's Probably Me",
          "id": "1X3Vb1oIAW6Ee22JZAEi59"
        },
        {
          "name": "Key To The Highway",
          "id": "1r6Xp7EiQQ7F63HjbFHNJn"
        },
        {
          "name": "Layla",
          "id": "0S2cMsSo3KgOQF8QdxgYrk"
        },
        {
          "name": "Let It Rain",
          "id": "0hMNAUx9fFBdYQRO5FoQvL"
        },
        {
          "name": "Little Wing - Live in San Diego",
          "id": "2zCSLeIp5lCHIMFNJUXySC"
        },
        {
          "name": "Lonely Stranger",
          "id": "5nZax8mmBCb4UYnW6ibvTb"
        },
        {
          "name": "Marry You",
          "id": "2ZCs3CbZkxpTIcqc2fFV1U"
        },
        {
          "name": "My Father's Eyes",
          "id": "7aAkwqs3Yp94iIiPRRD7QA"
        }
      ],
      "position": 54
    },
    {
      "name": "Dr. Dre",
      "id": "6DPYiyq5kWVQS4RGwxzPC7",
      "Musics": [
        {
          "name": "Ackrite",
          "id": "7EV37bmY3qzHzf8PA3ueMv"
        },
        {
          "name": "Bar One",
          "id": "6aIp8fjllvhTqCrHgAKJR1"
        },
        {
          "name": "Big Ego's",
          "id": "4ZAwgG8LRZCJ32ALrycqCr"
        },
        {
          "name": "Bitch Niggaz",
          "id": "4DhGh3CU7dzZLRu2bIrrIq"
        },
        {
          "name": "Bitch Please II",
          "id": "3q3GlTG8nU35F4OxxFz8Rv"
        },
        {
          "name": "Compton",
          "id": "0O6cYePgIBlMQ0pAFate3q"
        },
        {
          "name": "Crack A Bottle",
          "id": "5Zi5RHFI0tWKkzoiob2OtU"
        },
        {
          "name": "Eazy-Duz-It",
          "id": "3ov8CNjnyHcOiXkBNRwP7d"
        },
        {
          "name": "Ed-Ucation",
          "id": "1ncA0KNEe4cuoEe1ZsPwVX"
        },
        {
          "name": "Forgot About Dre",
          "id": "0Zh5U48tZNeAzzLTV1CVBE"
        },
        {
          "name": "Fuck You",
          "id": "5t6bYzld1vAXUEs9GAA149"
        },
        {
          "name": "Guilty Conscience",
          "id": "6hWxL0tpZm0QOLNSpT6Qra"
        },
        {
          "name": "Housewife",
          "id": "6UeR9EXQ3JWOWiDX7ZnDhD"
        },
        {
          "name": "I Need A Doctor",
          "id": "1aUT4xl8iiYNr6emik4qTB"
        },
        {
          "name": "Keep Their Heads Ringin' - LP Version;",
          "id": "1rylJ0VXvhOzLGNm401iaI"
        },
        {
          "name": "Kush - Main",
          "id": "0D5ER6UGojHVHVVJV0QdY8"
        },
        {
          "name": "Let's Get High",
          "id": "5PtZZkNYizyl4tq4Ru6pCL"
        },
        {
          "name": "Light Speed",
          "id": "7KYu84qzxD1u02KW8F1YOo"
        },
        {
          "name": "Lolo (Intro)",
          "id": "6JzrLImeXZZXt78330dh5m"
        },
        {
          "name": "Murder Ink",
          "id": "4F4YSSwkuZjH0viCgq7Tc4"
        }
      ],
      "position": 55
    },
    {
      "name": "Grateful Dead",
      "id": "4TMHGUX5WI7OOm53PqSDAT",
      "Musics": [
        {
          "name": "Alabama Getaway",
          "id": "5WVF1Ftv5oxspRac9km99R"
        },
        {
          "name": "Althea",
          "id": "7M7AwtGvWdMYudqx5Iuh1m"
        },
        {
          "name": "Attics Of My Life",
          "id": "5U0lHydo7tQh5t3dxHpQzu"
        },
        {
          "name": "Bertha - Live at Red Rocks Amphitheatre, Morrison, CO 7/8/78",
          "id": "1tiHWzoKdkjKx1UwZ5iYQu"
        },
        {
          "name": "Box Of Rain",
          "id": "7x2xjJV3YAPeLQJ7u3Kjet"
        },
        {
          "name": "Brokedown Palace",
          "id": "362CS15hE1upuTKoWApzLn"
        },
        {
          "name": "Candyman",
          "id": "4FJ0051ukEptZAhP01ExGV"
        },
        {
          "name": "Casey Jones",
          "id": "7LbfuQVct78YoghmoPtsQ8"
        },
        {
          "name": "China Cat Sunflower [Live] (Taking Woodstock - OST)",
          "id": "3R145qISh3gg5nqsBTpx4Q"
        },
        {
          "name": "Cumberland Blues",
          "id": "2op5szd2IY8bOPzumqmFY3"
        },
        {
          "name": "Dark Star [Single Version] (What A Long Strange Trip Version)",
          "id": "2AF1drAUmMi8ZX0U97UJLw"
        },
        {
          "name": "Estimated Prophet (Remastered Album Version)",
          "id": "5gzLGvHDeVbCy7xBcbV38e"
        },
        {
          "name": "Eyes Of The World",
          "id": "0qJ6owHt00MMZTpNmNsPHC"
        },
        {
          "name": "Fire On The Mountain (Remastered Album Version)",
          "id": "5m7ohNYrOMl4UGBUxmVeN8"
        },
        {
          "name": "Franklin's Tower",
          "id": "3PgIhd4XmwtmV2XGU5qhzZ"
        },
        {
          "name": "Friend Of The Devil",
          "id": "6GgTJJmtDddHoo8Bp6lVcf"
        },
        {
          "name": "Help On The Way / Slipknot!",
          "id": "5mWhyozge9IIMdfIboHgGI"
        },
        {
          "name": "High Time",
          "id": "5vmGZ4645Pyx1vHNBgFGDI"
        },
        {
          "name": "New Speedway Boogie",
          "id": "3YPBV5DacTbhgh7vharn6w"
        },
        {
          "name": "Operator",
          "id": "1gv1jIEj20oPXhFDl7jyLS"
        }
      ],
      "position": 56
    },
    {
      "name": "Funkadelic Parliament",
      "id": "5SMVzTJyKFJ7TUb46DglcH",
      "Musics": [
        {
          "name": "Ain't That Funkin' Kinda Hard on You? - We Ain't Neva Gonna Stop Remix",
          "id": "6SgQIoLn8kpu8J4wfwGWy8"
        },
        {
          "name": "Alice In My Fantasies",
          "id": "1vsVBdWoIvDxoZmvNVFGqp"
        },
        {
          "name": "Baby Like Fonkin' it Up",
          "id": "3AWVkQyljZmceTw7oeXINn"
        },
        {
          "name": "Back In Our Minds",
          "id": "3y2hEjhiPjl7J9Qzi1Ns9n"
        },
        {
          "name": "Biological Speculation",
          "id": "6GJOjvlrF2TKxq19Ey2H66"
        },
        {
          "name": "Can You Get To That",
          "id": "3SWZ9fHtWMxwkFok5qhhpO"
        },
        {
          "name": "Cosmic Slop",
          "id": "3phui3c5fTVI1xtYVBX1YA"
        },
        {
          "name": "Free Your Mind And Your Ass Will Follow",
          "id": "4FJSCTmoiVpZm8wcXHou6Y"
        },
        {
          "name": "Funky Dollar Bill",
          "id": "5gxV39s1AKh5z9COkAMBTS"
        },
        {
          "name": "Get Low",
          "id": "0I3OYZek1ZWaWkuKT3zrzh"
        },
        {
          "name": "Good Old Music",
          "id": "50vdvLKCTkoyCD7OuMky8M"
        },
        {
          "name": "Good Thoughts, Bad Thoughts",
          "id": "3ueN9szC38HHk3dZqOdoyq"
        },
        {
          "name": "Hit It And Quit It",
          "id": "5peWpcnjifjAIexmFCYiRK"
        },
        {
          "name": "I Got A Thing, You Got A Thing, Everybody's Got A Thing",
          "id": "7s8tQhvJ7Z9lQ3twN6z67v"
        },
        {
          "name": "I Miss My Baby - 1972 Version",
          "id": "0vIfH5rkIc9pX5nw35uYVB"
        },
        {
          "name": "I'll Bet You",
          "id": "05lMKqArS6elud6tNyh2To"
        },
        {
          "name": "I'll Stay",
          "id": "0TkZzL5bCSXMbqkBvwgpFX"
        },
        {
          "name": "Jimmy's Got A Little Bit Of Bitch In Him",
          "id": "74cKhmiY13vGNQtgPPvFVv"
        },
        {
          "name": "Maggot Brain",
          "id": "505adiMkMfo80cg6HJtmWT"
        },
        {
          "name": "Mommy, What's A Funkadelic?",
          "id": "529r5eWIW2FxhawU3AVECr"
        }
      ],
      "position": 57
    },
    {
      "name": "Aerosmith",
      "id": "7Ey4PD4MYsKc5I2dolUwbH",
      "Musics": [
        {
          "name": "Ain't That A Bitch",
          "id": "5BYs1MzSOtId1t2itGmHh2"
        },
        {
          "name": "Amazing",
          "id": "2YswrtCvqzD5k8AWT7irnS"
        },
        {
          "name": "Angel",
          "id": "6r4laxAXabuv6pK9Nzoskc"
        },
        {
          "name": "Back In the Saddle",
          "id": "0ZGLuduCPjgWY1n85ykgMe"
        },
        {
          "name": "Come Together",
          "id": "08yfTLT6ei3j15382V1foN"
        },
        {
          "name": "Crazy",
          "id": "2cBGl1Ehr1D9xbqNmraqb4"
        },
        {
          "name": "Cryin'",
          "id": "5flJv3fwyIA4N8ufMgbAQa"
        },
        {
          "name": "Dream On",
          "id": "07KHJvlYBeQVqrmifTEqEp"
        },
        {
          "name": "Dude (Looks Like A Lady)",
          "id": "6R7jplRyXCZPza3UzZqRyj"
        },
        {
          "name": "Falling In Love (Is Hard On The Knees)",
          "id": "19KgHn4xOihAA2cbTTlEu1"
        },
        {
          "name": "Fly Away From Here",
          "id": "4QB2cdh2v5zeRD1khGF9A5"
        },
        {
          "name": "Full Circle",
          "id": "3J36VgHD5KvlNR7NinNph5"
        },
        {
          "name": "Girls of Summer",
          "id": "3TKBJZ7GVDnZpW2hyldB16"
        },
        {
          "name": "Hole In My Soul",
          "id": "7kPuCwBWgXy5TGfgwNUKwV"
        },
        {
          "name": "I Don't Want to Miss a Thing",
          "id": "225xvV8r1yKMHErSWivnow"
        },
        {
          "name": "Jaded",
          "id": "4iihDHIoKZdOeOW1kFDUtR"
        },
        {
          "name": "Janie's Got A Gun - Single Version",
          "id": "200Yp0rZTkp6ITSMbGjMK3"
        },
        {
          "name": "Last Child",
          "id": "7gpavVMJwJYFNUzfzUdSv7"
        },
        {
          "name": "Livin' On The Edge",
          "id": "0O712LGGTk8e0CFMdUPSB5"
        },
        {
          "name": "Love In An Elevator",
          "id": "698l7REElsTWCwScsADqxf"
        }
      ],
      "position": 58
    },
    {
      "name": "The Sex Pistols",
      "id": "1u7kkVrr14iBvrpYnZILJR",
      "Musics": [
        {
          "name": "Anarchy in the U.k.(sex Pistols)",
          "id": "2q6KkUATKZjtD17pU5J0Sx"
        },
        {
          "name": "Bodies",
          "id": "683xC3EA0hS3gwr3V6bjpR"
        },
        {
          "name": "God Save The Queen",
          "id": "7L5cmBsQli3cbg5oIsM0xl"
        },
        {
          "name": "Holidays In The Sun",
          "id": "7bOHMnvYHLxuZQuWWv3Tp7"
        },
        {
          "name": "No Feelings",
          "id": "03dIJr7Sycpl7ZBypGrYPT"
        },
        {
          "name": "No Fun",
          "id": "7EL52C7JGIaklsU07IrszH"
        },
        {
          "name": "Pretty Vacant (as made famous by Sex Pistols)",
          "id": "6Qhz76UvT48VylFRAMIASq"
        },
        {
          "name": "Who Killed Bambi?",
          "id": "06ciNvWIjGzydeqZRyMMmi"
        }
      ],
      "position": 59
    },
    {
      "name": "Metallica",
      "id": "2ye2Wgw4gimLv2eAKyk1NB",
      "Musics": [
        {
          "name": "...And Justice For All",
          "id": "2VIk1zgNk6aRiIQ9C1T4Yu"
        },
        {
          "name": "All Nightmare Long",
          "id": "6VpUZlL6wGaVm98gGUs8Qq"
        },
        {
          "name": "Atlas, Rise!",
          "id": "5GRZOUSXYgUdtJS1mCZFj3"
        },
        {
          "name": "Battery",
          "id": "4A1jq5W97gi5ok44CgZiab"
        },
        {
          "name": "Blackened",
          "id": "0Zx5fEgwEjyljQsuZYPYj8"
        },
        {
          "name": "Creeping Death (Live)",
          "id": "3H2wWBP6QXJpOmDKkihBiF"
        },
        {
          "name": "Cyanide",
          "id": "2V6yO7x7gQuaRoPesMZ5hr"
        },
        {
          "name": "Die Die My Darling",
          "id": "7fyNUr8QEkeM2LGVunVm5J"
        },
        {
          "name": "Don't Tread On Me",
          "id": "2ANizw1jaLMP5UQHYyOvri"
        },
        {
          "name": "Enter Sandman",
          "id": "1hKdDCpiI9mqz1jVHRKG0E"
        },
        {
          "name": "Fade To Black (Remastered)",
          "id": "0dqGfCMAGyDgpUAgLNOjWd"
        },
        {
          "name": "Fight Fire With Fire (Remastered)",
          "id": "0WSRrGVg1gO33MKIBPgBV2"
        },
        {
          "name": "For Whom The Bell Tolls (Live)",
          "id": "2VzAyholTBTXhkqxNO8YEh"
        },
        {
          "name": "Fuel",
          "id": "0NdidkH0EQwG7mx6F6SDkI"
        },
        {
          "name": "Hardwired",
          "id": "01JszWYuKqRjddPQ4creVF"
        },
        {
          "name": "Hero Of The Day",
          "id": "4QvyAavoF7Fh036aPw8MVK"
        },
        {
          "name": "Hit The Lights (Remastered)",
          "id": "52m8IrzripYje6bVxUILQU"
        },
        {
          "name": "Holier Than Thou",
          "id": "1yOvj5DRzCxeQCts03MVTw"
        },
        {
          "name": "Mama Said",
          "id": "0hAKD3hdy0RUPiPJFz270S"
        },
        {
          "name": "Master Of Puppets",
          "id": "6NwbeybX6TDtXlpXvnUOZC"
        }
      ],
      "position": 60
    },
    {
      "name": "Joni Mitchell",
      "id": "5hW4L92KnC6dX9t7tYM4Ve",
      "Musics": [
        {
          "name": "A Case Of You",
          "id": "41JlTwBvRReaitzs36quB9"
        },
        {
          "name": "All I Want",
          "id": "7jeSFewaQLq8t2x8OZFQxZ"
        },
        {
          "name": "Amelia",
          "id": "0sWXc2HP7INhTEkuUbxJGk"
        },
        {
          "name": "Answer Me, My Love",
          "id": "1rXnPt4mVXOzKalO5Lj54t"
        },
        {
          "name": "At Last",
          "id": "0fJ561ClK3pIJBr0c6dtUX"
        },
        {
          "name": "Big Yellow Taxi",
          "id": "7D5LGaPWKe30hlz2oEz2Aa"
        },
        {
          "name": "Blue",
          "id": "1yWIsH3TC51gmzvQxZNCQC"
        },
        {
          "name": "Both Sides Now",
          "id": "1pjATX7sbd6Y4jMVqIvzHk"
        },
        {
          "name": "Cactus Tree",
          "id": "0TUPxOcJc4R3PbWo8QwC3m"
        },
        {
          "name": "California",
          "id": "5eM6Rrk8rwLpUhrh7Kk5R1"
        },
        {
          "name": "Car On A Hill",
          "id": "27VoOUIDXAAgmEXSjOJ1gD"
        },
        {
          "name": "Carey",
          "id": "11dUk8E2z8Oj1JURwl7GJd"
        },
        {
          "name": "Chelsea Morning",
          "id": "5G0q5jtbxFCoqfbIDCIGky"
        },
        {
          "name": "Comes Love",
          "id": "1BHXcIIAqAHO1EHMjYBqSM"
        },
        {
          "name": "Conversation",
          "id": "1wcbiRER4ChnikvcLc2OE6"
        },
        {
          "name": "Court And Spark",
          "id": "2l8kERLPqgP7p94Duj9nqH"
        },
        {
          "name": "Coyote",
          "id": "5fdjxHzBILxMXRrbbOVupJ"
        },
        {
          "name": "For Free",
          "id": "4lTcqxjs7OWzg5pqC3UEM5"
        },
        {
          "name": "Free Man In Paris",
          "id": "2by5mqpQ1ZP2G5FOIccMnu"
        },
        {
          "name": "Furry Sings The Blues",
          "id": "2fCvO4vU4LLEzHLsKKrVr7"
        }
      ],
      "position": 61
    },
    {
      "name": "Tina Turner",
      "id": "1zuJe6b1roixEKMOtyrEak",
      "Musics": [
        {
          "name": "Addicted To Love - Live In Arnhem",
          "id": "2zI35WhpGKTpzfZXkcs6OQ"
        },
        {
          "name": "Better Be Good To Me - 2015 Remastered Version",
          "id": "4N5HyZ1PlXuP6sryIa4hOQ"
        },
        {
          "name": "Cosas de la Vida (Can't Stop Thinking of You)",
          "id": "0UHU2IjfzP8khcbznwn6eW"
        },
        {
          "name": "Cose Della Vita",
          "id": "2bJtJv5NGkYUFP6prU3WSg"
        },
        {
          "name": "Disco Inferno",
          "id": "4435IXzAIDxcaZaUUKBDx6"
        },
        {
          "name": "Goldeneye",
          "id": "528QhCT2v3HgD71RmrSUNW"
        },
        {
          "name": "Help! - 2015 Remastered Version",
          "id": "2pS0CrdMkR6fdjRmSaWkg2"
        },
        {
          "name": "I Don't Wanna Fight - Single Edit",
          "id": "4D6i2CM29NHkUDI3jQ2afk"
        },
        {
          "name": "I Don't Wanna Lose You",
          "id": "3ko1GJaUNtwFaxp8hlhhWq"
        },
        {
          "name": "I Might Have Been Queen - 2015 Remastered Version",
          "id": "27v32fV3y5dD2ltG3iPOAv"
        },
        {
          "name": "It's Only Love",
          "id": "6TvH2n9na9jYO1Y2LUkqrL"
        },
        {
          "name": "Let's Stay Together",
          "id": "6UgSIl72NG9gTLxqHQ8qqP"
        },
        {
          "name": "Look Me In The Heart",
          "id": "1fGp4fTyygENTKwidYlqNr"
        },
        {
          "name": "Missing You - Single Edit",
          "id": "5n7IudGA8j5x2pzNouxHdy"
        },
        {
          "name": "Nutbush City Limits",
          "id": "06yREZ9X92R2e9RJpdzZ2O"
        },
        {
          "name": "Paradise Is Here",
          "id": "46AtxnFTO1enGnkAq90uHo"
        },
        {
          "name": "Private Dancer - 2015 Remastered Version",
          "id": "5JjdJK0uGRUk4skRTuQdUZ"
        },
        {
          "name": "Proud Mary",
          "id": "6gJdDnF2TzfA1WPMXuCa3x"
        },
        {
          "name": "River Deep - Mountain High",
          "id": "4psjgB5e5HIuUeSVbEUY64"
        },
        {
          "name": "River Deep Mountain High",
          "id": "19jo0UT2vqD4pNVfIqTy4R"
        }
      ],
      "position": 62
    },
    {
      "name": "Phil Spector",
      "id": "3jVMgT4X7YeuYE4aludcmE",
      "Musics": [
        {
          "name": "Annette",
          "id": "2VmTBsJlHFoe1o2UVR1L93"
        },
        {
          "name": "Bebe and Susu",
          "id": "6Vou4C7U7atD1omCEQOog2"
        },
        {
          "name": "Big Red",
          "id": "4c5e2wDtYAORgikdAWBu41"
        },
        {
          "name": "Brother Julius",
          "id": "4RJjCwrAGM1WrB0s56STSG"
        },
        {
          "name": "Christmas (Baby Please Come Home)",
          "id": "3ou33BPlzRxBkWjoFWixb2"
        },
        {
          "name": "Chubby Danny D",
          "id": "57WE82MTJEXLJ0b8OslHRZ"
        },
        {
          "name": "Dr. Kaplan's Office",
          "id": "26WtYDU3hsKnddkf5BCfpH"
        },
        {
          "name": "Flip & Nitty",
          "id": "3wk6WfyT5m9c2xolubV24D"
        },
        {
          "name": "Flip and Nitty",
          "id": "36uFizBlt3aTWaMd7ejeOl"
        },
        {
          "name": "Frosty the Snowman",
          "id": "7JVMhRQXzm7VLFgqG9WRCx"
        },
        {
          "name": "Git' It",
          "id": "04jVKnTr20je5qvgWDa29J"
        },
        {
          "name": "Harry (From W. Va.) & Milt",
          "id": "3xU5bLlWNXWzPxvQu44qEr"
        },
        {
          "name": "Harry and Milt Meet Hal B",
          "id": "0f8zM4Or6dgSTd2OEitBM8"
        },
        {
          "name": "Here Comes Santa Claus",
          "id": "2TRgbDqnr0tG5fbDsYOIcc"
        },
        {
          "name": "I Saw Mommy Kissing Santa Claus",
          "id": "2qsvM8AwdEgRHcfuasysG0"
        },
        {
          "name": "I Want You Around - Soundtrack Version / Remastered",
          "id": "5L1DHZ81ieWa8Kii7hg6Ho"
        },
        {
          "name": "Irving (Jaggered Sixteenths)",
          "id": "0vh0Kl1myf7SgW6zHzPbSr"
        },
        {
          "name": "Larry L.",
          "id": "7yy6kQQr1f3yvxljCr1mhR"
        },
        {
          "name": "Marshmallow World",
          "id": "7eqoO413g2xt4mBRrUcxZ1"
        },
        {
          "name": "Miss Joan and Mister Sam",
          "id": "4b82EDLCgLPOYOv7JZnFTt"
        }
      ],
      "position": 63
    },
    {
      "name": "The Kinks",
      "id": "1SQRv42e4PjEYfPhS0Tk9E",
      "Musics": [
        {
          "name": "(Wish I Could Fly Like) Superman",
          "id": "4uDnx2eQm8V9Fnj0L0k8bb"
        },
        {
          "name": "A Well Respected Man",
          "id": "0bqEyA4bNCrjbQqBMt6hvA"
        },
        {
          "name": "Alcohol",
          "id": "2OQDG8NwYcDvjD83iBJPFM"
        },
        {
          "name": "All Day And All Of The Night",
          "id": "7xQMKG2omICY6LEAmJIfwk"
        },
        {
          "name": "Apeman",
          "id": "4klwr4bySHFXES1zQOZi6O"
        },
        {
          "name": "Celluloid Heroes",
          "id": "3MLwfbEVt1Ub3uA8Hq6nby"
        },
        {
          "name": "Come Dancing",
          "id": "32y1kRg6IF3f6jpkHxzFoK"
        },
        {
          "name": "Dead End Street - Mono Version",
          "id": "2x92M49LtH9unG2TvMBn2O"
        },
        {
          "name": "Denmark Street",
          "id": "3eoyHkPb7JrvTQx7XPMoo8"
        },
        {
          "name": "Destroyer",
          "id": "1dpD3rzGYW1mHtNxG1NbwI"
        },
        {
          "name": "Get Back In the Line",
          "id": "6q8sAgpIRCcEDZj4qZCrIN"
        },
        {
          "name": "Here Comes Yet Another Day",
          "id": "0fkn4uGwNLebxIWPKmshZv"
        },
        {
          "name": "Hot Potatoes",
          "id": "7f5NJBcDAEAJdmKhCbwTQt"
        },
        {
          "name": "I Need You",
          "id": "1U4GWcdD0vpfrExgj9HbWb"
        },
        {
          "name": "I'm Not Like Everybody Else",
          "id": "5sf5CRFweT3lpVtp0PWHO4"
        },
        {
          "name": "Living On a Thin Line",
          "id": "4WmEnnsC9ziJxMwVPhUYGo"
        },
        {
          "name": "Lola",
          "id": "5ELbcZndp49XTIblVA1yaV"
        },
        {
          "name": "Maximum Consumption",
          "id": "68AM2WErrh5KN1u79I8071"
        },
        {
          "name": "Motorway",
          "id": "6YoVR2TQOxVs3YsQsgkQdh"
        },
        {
          "name": "Nothin' In The World Can Stop Me Worryin' 'Bout That Girl",
          "id": "1KUQVgjvBrwEaC32aEv9dx"
        }
      ],
      "position": 64
    },
    {
      "name": "Al Green",
      "id": "3dkbV4qihUeMsqN4vBGg93",
      "Musics": [
        {
          "name": "Call Me (Come Back Home)",
          "id": "5gk2tA550grQpwTr1W5cwx"
        },
        {
          "name": "Feel Like I Do",
          "id": "6EyX84foSNmsbVawmxdvNb"
        },
        {
          "name": "For the Good Times",
          "id": "09nLxlLiZXMMMjhd6A0Yg4"
        },
        {
          "name": "Free At Last",
          "id": "3OOmYBWtOPA8ja2wL5zXpI"
        },
        {
          "name": "Get Back",
          "id": "2E3CeZHQHJ2FxS9BcoNEYQ"
        },
        {
          "name": "Here I Am (Come And Take Me)",
          "id": "4X8IS5VQYmbnthia8GWlPA"
        },
        {
          "name": "How Can You Mend A Broken Heart",
          "id": "3ciW9xIClNWBPw0m0SRK4E"
        },
        {
          "name": "I Can't Get Next To You",
          "id": "1st5uXka2sH1InMevNUxsE"
        },
        {
          "name": "I Want To Hold Your Hand",
          "id": "330CJAmp3xmeg2X8oELGrI"
        },
        {
          "name": "I'm Glad You're Mine",
          "id": "4m1ZbZuu9DPwhyiYMjdPYf"
        },
        {
          "name": "I'm Still In Love With You",
          "id": "7tAKN3F0RnGzNCQQMQSqMR"
        },
        {
          "name": "I'm a Ram",
          "id": "00tygVu9Jqie5Vk9VqPhF5"
        },
        {
          "name": "I've Never Found a Girl",
          "id": "3WJLJCOsGt092y5scoA5In"
        },
        {
          "name": "It Ain't No Fun to Me",
          "id": "2ssT7XhqZmvyGLNoY4jCsh"
        },
        {
          "name": "Judy",
          "id": "6x9V4BM7T7XAnu82UtqARa"
        },
        {
          "name": "Just For Me",
          "id": "0Kjt9OTYDgTPTyiLRSkWp9"
        },
        {
          "name": "La-La for You",
          "id": "6TflF2GGDNccBBTNNBKp2j"
        },
        {
          "name": "Lay It Down",
          "id": "3uwqmrJ1SfKoXhfYNHTO4J"
        },
        {
          "name": "Let's Get Married",
          "id": "56XB2LQiStMDZUJsz6Doww"
        },
        {
          "name": "Let's Stay Together",
          "id": "7kWhdmRYv8CqbWNqfojqVd"
        }
      ],
      "position": 65
    },
    {
      "name": "Cream",
      "id": "74oJ4qxwOZvX6oSsu1DGnw",
      "Musics": [
        {
          "name": "As You Said",
          "id": "6wfJdumLzPeI1utemeVbLo"
        },
        {
          "name": "Badge",
          "id": "1SeQ2vGzQfMQ6lycf226t9"
        },
        {
          "name": "Binaural Beats: Theta- Loopable with No Fade",
          "id": "1O9IsuLlysmZTnw9BH1bsm"
        },
        {
          "name": "Blue Condition",
          "id": "7q4LdWxa4u7GqDmSeY84ym"
        },
        {
          "name": "Born Under A Bad Sign",
          "id": "4tiUQufYCq34Pk3ekM4J0S"
        },
        {
          "name": "Crossroads - Live",
          "id": "4bD51UlO6y0FEpz7xyZMZ7"
        },
        {
          "name": "Dance The Night Away",
          "id": "6tZC5Ovxc9eLYJGoK2plh5"
        },
        {
          "name": "Deserted Cities Of The Heart",
          "id": "586bYVb8KzSAGSqBldm5t0"
        },
        {
          "name": "I Feel Free",
          "id": "3n1wTBzxeQmpLOC4Dp77b9"
        },
        {
          "name": "I'm Jelly BABY",
          "id": "4xcbkTvjekjJ5qPhRF4N5g"
        },
        {
          "name": "I'm So Glad",
          "id": "61XVDwefOFFszHlEfImqz3"
        },
        {
          "name": "Mother's Lament",
          "id": "1txUOVYaCgQUiasUfb57y7"
        },
        {
          "name": "N.S.U.",
          "id": "1mWH4Oj4eqaKUQbWmdE5qf"
        },
        {
          "name": "Outside Woman Blues",
          "id": "1HyhnVtU67KjlanyVdeIO4"
        },
        {
          "name": "Passing The Time",
          "id": "1s80eDSSBOaFsRS2NtUyT4"
        },
        {
          "name": "Politician",
          "id": "0HFgUUhjrFY6sxlGqQ9Dws"
        },
        {
          "name": "SWLABR",
          "id": "1RTPjCA8T2wjxomLc3oMTx"
        },
        {
          "name": "Sitting On Top Of The World",
          "id": "3fQlIV5afIUzrK4z2D2hTW"
        },
        {
          "name": "Sleepy Time Time - Live",
          "id": "6OThbRkc8jAoGqKYpArqOA"
        },
        {
          "name": "Spoonful",
          "id": "0geuHyGUqnGbeIpd9rK0GY"
        }
      ],
      "position": 66
    },
    {
      "name": "The Temptations",
      "id": "3RwQ26hR2tJtA8F9p2n7jG",
      "Musics": [
        {
          "name": "Ain't Too Proud To Beg",
          "id": "47Hl7stDTmTWF8DgL99B0F"
        },
        {
          "name": "Ball Of Confusion (That's What The World Is Today) - Stereo Version",
          "id": "66EeNlM6XT646CGZM6zceh"
        },
        {
          "name": "Get Ready",
          "id": "5OJO7kNqxUWQgYpRkz8PMX"
        },
        {
          "name": "Hum Along And Dance",
          "id": "4u000PH4UTNzJzQuCOypGH"
        },
        {
          "name": "I Can't Get Next To You",
          "id": "2kaOXzYZCJhhZslElfrfOq"
        },
        {
          "name": "I Wish It Would Rain",
          "id": "6ePg7Gsej17RfQQKjsY0rf"
        },
        {
          "name": "It's Growing - Album Version / Stereo",
          "id": "3QKCpIlCIr3tXwXubJL3Sa"
        },
        {
          "name": "Just My Imagination (Running Away With Me)",
          "id": "6lcv65MWdpacRrsHWeb1Oh"
        },
        {
          "name": "My Girl",
          "id": "0clhfW4plYSOdKH4Nl2y2u"
        },
        {
          "name": "Never, Never Gonna Give Ya Up",
          "id": "26d9KjBifZsPPuMFlUO7N5"
        },
        {
          "name": "Night And Day",
          "id": "4efmectAvvuMyydty3o9TL"
        },
        {
          "name": "Papa Was A Rollin' Stone",
          "id": "6eyxSV8hr1lu6Mdir5L3Lt"
        },
        {
          "name": "Papa Was A Rolling Stone",
          "id": "5Lno0hPhvo7BzXVLQzDIS3"
        },
        {
          "name": "Standing On The Top - Pt. 1/Single Version",
          "id": "16Vy2s9eIXsMVVG8Rikt3Z"
        },
        {
          "name": "The Way You Do The Things You Do",
          "id": "2Vv83FqTavH5fyuXva3L4T"
        },
        {
          "name": "Treat Her Like A Lady",
          "id": "1AO8sSbod0Rog6ZlBkcKyH"
        },
        {
          "name": "What Love Has Joined Together - Album Version / Stereo",
          "id": "1U4mcCbIWId1RvelOGKUZ8"
        },
        {
          "name": "What's So Good About Goodbye",
          "id": "2blfBJ0F2YT7tMORUzf19L"
        },
        {
          "name": "Who's Lovin' You - Album Version / Stereo",
          "id": "1u4GfEKZmuFOkewDXrW9XX"
        },
        {
          "name": "You Beat Me To The Punch",
          "id": "122lIRONUKjIgrYJRNd15z"
        }
      ],
      "position": 67
    },
    {
      "name": "Jackie Wilson",
      "id": "4VnomLtKTm9Ahe1tZfmZju",
      "Musics": [
        {
          "name": "(I Can Feel Those Vibrations) This Love Is Real",
          "id": "2QM3bCcmAwiuwDvhIispV8"
        },
        {
          "name": "A Woman A Lover A Friend",
          "id": "6sIhdMiTFJfLFVQ73ugQHg"
        },
        {
          "name": "Alone At Last",
          "id": "5QZyGPDlIyk75zl8sOOXbh"
        },
        {
          "name": "Am I The Man",
          "id": "56T9QL3AHmckfvWkUOjGk4"
        },
        {
          "name": "Baby Workout",
          "id": "4c9g1LMBE6RMxmI9DcxlQw"
        },
        {
          "name": "Because Of You",
          "id": "0pJxCMDnKricURHgbO2sq0"
        },
        {
          "name": "Come Back To Me",
          "id": "5t1cHeyUTAaoxW8V5HtdZd"
        },
        {
          "name": "Danny Boy",
          "id": "2Jy7WpTqsa8yJtrdvfse0o"
        },
        {
          "name": "Doggin' Around",
          "id": "0T7jzjQENOkhRNwkfGbTO7"
        },
        {
          "name": "Eleanor Rigby",
          "id": "1Qi3q92knbahIoCIfcdet3"
        },
        {
          "name": "Etcetera",
          "id": "2x9MEAKtnPYsACL1vMoniU"
        },
        {
          "name": "For Once In My Life",
          "id": "1T1ASwPM4XeKXIkCzel9WW"
        },
        {
          "name": "I Don't Need You Around",
          "id": "4l1vkRQgycmsEWhCSTvTQH"
        },
        {
          "name": "I Get The Sweetest Feeling",
          "id": "0MJjMFUJ7buH4iKn2TYH75"
        },
        {
          "name": "I'll Be Satisfied",
          "id": "0mtwgr3apJADw4cFQdI6Vm"
        },
        {
          "name": "I'm Comin' On Back To You",
          "id": "4jrKFHE30YVU8JrvzAuNRE"
        },
        {
          "name": "I've Lost You",
          "id": "1EsFcGTvnuqvlrpsrvqNQv"
        },
        {
          "name": "Light My Fire",
          "id": "4My7C1Jw1gqjihxC5YL1xI"
        },
        {
          "name": "Lonely Teardrops",
          "id": "4xPNaHofsEWeDnD63eIUXp"
        },
        {
          "name": "My Heart Is Calling",
          "id": "7qX5rK2oQoXnoKL0kbCdaG"
        }
      ],
      "position": 68
    },
    {
      "name": "The Police",
      "id": "5NGO30tJxFlKixkPSgXcFE",
      "Musics": [
        {
          "name": "Bring On The Night - Remastered 2003",
          "id": "3ICRVhH1mviNzbUg5kjuri"
        },
        {
          "name": "Can't Stand Losing You",
          "id": "1VKbWRpwV2XXSJSZ2w534h"
        },
        {
          "name": "De Do Do Do, De Da Da Da",
          "id": "3byoLAfuQWkM3PO4TlTltv"
        },
        {
          "name": "Don't Stand So Close To Me",
          "id": "7H2l6luhrT1wqZ521Sc5vm"
        },
        {
          "name": "Every Breath You Take",
          "id": "5vIbxIF4s1Ud0ueWLy4AGR"
        },
        {
          "name": "Every Little Thing She Does Is Magic",
          "id": "2Fj2oah3ab05Oju8cY3Wj8"
        },
        {
          "name": "King Of Pain",
          "id": "79jKSlgmGyZQ7RteJV9E81"
        },
        {
          "name": "Message In A Bottle",
          "id": "5aGi4rrETQGNtZeGqJYpzh"
        },
        {
          "name": "Next To You - Remastered 2003",
          "id": "4DPOoRhgBJf73mmkxmNAax"
        },
        {
          "name": "Roxanne",
          "id": "7oaKbstuYsGCnmyjokrnq8"
        },
        {
          "name": "So Lonely",
          "id": "0s1HVzCiEUFyGI6UNoVb2S"
        },
        {
          "name": "Spirits In The Material World",
          "id": "1SZLSZfVqke568NHS3cBIV"
        },
        {
          "name": "Synchronicity I - Remastered 2003",
          "id": "4J6pO5yKVyHKsYiahk8oZ7"
        },
        {
          "name": "Synchronicity II - Remastered 2003",
          "id": "3jJelhat4qausO64fnYoUg"
        },
        {
          "name": "Syncronicity II",
          "id": "6u4EOK4n24rsk8XgcXggSZ"
        },
        {
          "name": "Walking On The Moon",
          "id": "3Q7TedsolzrdYoVFJmoNjD"
        },
        {
          "name": "Wrapped Around Your Finger - Remastered 2003",
          "id": "6XloazWCEpPUUJa0REqBXB"
        }
      ],
      "position": 69
    },
    {
      "name": "Frank Zappa",
      "id": "6ra4GIOgCZQZMOaUECftGN",
      "Musics": [
        {
          "name": "Apostrophe'",
          "id": "78M81RIxqUdS8XU4YRXLej"
        },
        {
          "name": "Baby Snakes",
          "id": "7wUPAPIHmHyvbQLfXE0Zlk"
        },
        {
          "name": "Black Napkins",
          "id": "44kGTYx7O1LxPkQZVDIGG6"
        },
        {
          "name": "Blessed Relief",
          "id": "0oAMHrz4QA5SyEgyhJBRWl"
        },
        {
          "name": "Bobby Brown Goes Down",
          "id": "2a9OakOCdTECl91zL8MBJq"
        },
        {
          "name": "Broken Hearts Are For Assholes",
          "id": "4bwSoafJ4rWgoXc35w5lhr"
        },
        {
          "name": "Camarillo Brillo",
          "id": "2ypW6TLKuRLB4slwjGXGEZ"
        },
        {
          "name": "Catholic Girls",
          "id": "4Szp1LEQVAdRKQv5mPpR0e"
        },
        {
          "name": "Cosmik Debris",
          "id": "6VC0m8b8xWf671JApr8L7X"
        },
        {
          "name": "Crew Slut",
          "id": "3sVhRzDOCqCIC5pHxDX0Vy"
        },
        {
          "name": "Dancin' Fool",
          "id": "5lBnklAGhL965cWPxzhJQz"
        },
        {
          "name": "Dancing Fool",
          "id": "5s1LeoiNYGXpPsMUskORRO"
        },
        {
          "name": "Dirty Love",
          "id": "3joFWrrx52WwTrFpUHtKxZ"
        },
        {
          "name": "Don't Eat The Yellow Snow",
          "id": "3o0vWOTvH5I10iAswKuaTx"
        },
        {
          "name": "Excentrifugal Forz",
          "id": "6UMgHEp7XK4lroFTLcHC5k"
        },
        {
          "name": "Father O'Blivion",
          "id": "2e1SQOEw8vyOkhqpDFPwgd"
        },
        {
          "name": "Flakes",
          "id": "7yi2Vzc2Oa2Stgy9a8y51f"
        },
        {
          "name": "Hungry Freaks, Daddy",
          "id": "3Zwcr6lymZaeTXtEMxlfXA"
        },
        {
          "name": "I Have Been In You",
          "id": "1s8N0gZyKjkoAHtHVScXU1"
        },
        {
          "name": "I'm The Slime",
          "id": "4K6tWI0ApW6NUQ6hEN85kE"
        }
      ],
      "position": 70
    },
    {
      "name": "AC/DC",
      "id": "711MCceyCBcFnzjGY4Q7Un",
      "Musics": [
        {
          "name": "Back In Black",
          "id": "08mG3Y1vljYA6bvDt4Wqkj"
        },
        {
          "name": "Big Jack - Live at River Plate",
          "id": "4eJTrppVPYaf4RTVhFoLiV"
        },
        {
          "name": "Black Ice",
          "id": "3Axmw41lmMoXih3NJYzbXb"
        },
        {
          "name": "Dirty Deeds Done Dirt Cheap",
          "id": "2d4e45fmUnguxh6yqC7gNT"
        },
        {
          "name": "Dogs of War",
          "id": "2eSsmjwzDB9JTGvn2ZPLE9"
        },
        {
          "name": "Girls Got Rhythm",
          "id": "6Wn3pdFtAcnYJyJVITwt7N"
        },
        {
          "name": "Got Some Rock & Roll Thunder",
          "id": "5CqTorhnA1GUNh1Z8PnGiS"
        },
        {
          "name": "Hard Times",
          "id": "5aoTIWdzgcjGo3SdjxqWSf"
        },
        {
          "name": "Hard as a Rock",
          "id": "1gij27s31tFKcTHa8f1u4g"
        },
        {
          "name": "Hell Ain't a Bad Place to Be - Live at River Plate",
          "id": "5x1wkgdotvZwgmgscxFWcz"
        },
        {
          "name": "Hells Bells",
          "id": "69QHm3pustz01CJRwdo20z"
        },
        {
          "name": "Highway to Hell",
          "id": "1OIYK9Ya6EgwJ4fMngrPcK"
        },
        {
          "name": "If You Want Blood (You've Got It)",
          "id": "1V6kRlJnTC4W319N0BvJag"
        },
        {
          "name": "It's a Long Way to the Top (If You Wanna Rock 'N' Roll)",
          "id": "7nemcVsXVFZF01iqpIIo2Y"
        },
        {
          "name": "Jailbreak",
          "id": "5UKeFkVeUfvP6S43I8s9mt"
        },
        {
          "name": "Let Me Put My Love Into You",
          "id": "5XeMsYb1rWxQL1bUUaZajn"
        },
        {
          "name": "Miss Adventure",
          "id": "4WpGOn71DcfB9zMvnN9mLl"
        },
        {
          "name": "Moneytalks",
          "id": "5u5F7qLDvZjBSktaDp4HxB"
        },
        {
          "name": "Play Ball",
          "id": "3fpzBeEHvuXKOl7QeVe1iz"
        },
        {
          "name": "Rock N Roll Train",
          "id": "4feXJ5IC3avXsVW9WNFSag"
        }
      ],
      "position": 71
    },
    {
      "name": "Radiohead",
      "id": "4Z8W4fKeB5YxbusRsdQVPb",
      "Musics": [
        {
          "name": "(Nice Dream)",
          "id": "4QbQ55kHcRNho6XLaPctT1"
        },
        {
          "name": "15 Step",
          "id": "6dsq7Nt5mIFzvm5kIYNORy"
        },
        {
          "name": "2 + 2 = 5",
          "id": "37kUGdEJJ7NaMl5LFW4EA4"
        },
        {
          "name": "Airbag",
          "id": "3OsUjkcv1C1v5udFhgRSFg"
        },
        {
          "name": "All I Need",
          "id": "51ygW389BW4Dut3B69pSwc"
        },
        {
          "name": "Black Star",
          "id": "6JzzI3YxHCcjZ7MCQS2YS1"
        },
        {
          "name": "Bodysnatchers",
          "id": "4m0Vgr48VFaMYw0Sp1ozJu"
        },
        {
          "name": "Burn the Witch",
          "id": "3pcCifdPTc2BbqmWpEhtUd"
        },
        {
          "name": "Climbing Up the Walls",
          "id": "0R332cdlS9LyE0Ge2PSlVC"
        },
        {
          "name": "Creep",
          "id": "6b2oQwSGFkzsMtQruIWm2p"
        },
        {
          "name": "Daydreaming",
          "id": "1uRxyAup7OYrlh2SHJb80N"
        },
        {
          "name": "Decks Dark",
          "id": "5rIhBK9aaVMck0W2YtOwci"
        },
        {
          "name": "Desert Island Disk",
          "id": "1kBGeOp1CDUHVdbK4ergqo"
        },
        {
          "name": "Everything In Its Right Place",
          "id": "5AiNZnMDCWwujIENPj9PV9"
        },
        {
          "name": "Exit Music (For a Film)",
          "id": "4Na0siMtWOW9pJoWJ1Ponv"
        },
        {
          "name": "Fake Plastic Trees",
          "id": "045sp2JToyTaaKyXkGejPy"
        },
        {
          "name": "Faust Arp",
          "id": "5SdmtFbNOD7Qej6jFCHkOM"
        },
        {
          "name": "Ful Stop",
          "id": "4CzTgOmc3Sdm4EgKQWzjQl"
        },
        {
          "name": "Glass Eyes",
          "id": "0eZN5WsQfmNFICHuw59Zfz"
        },
        {
          "name": "High And Dry",
          "id": "5jafMI8FLibnjkYTZ33m0c"
        }
      ],
      "position": 72
    },
    {
      "name": "Hank Williams",
      "id": "1FClsNYBUoNFtGgzeG74dW",
      "Musics": [
        {
          "name": "(I Heard That) Lonesome Whistle - Single Version",
          "id": "6Qp2Aw1GQWXYCI4v51hVBL"
        },
        {
          "name": "3 Shades Of Black",
          "id": "5hr1Po9WfrdAuPMj0lVEA3"
        },
        {
          "name": "A Country Boy Can Survive",
          "id": "5jVGZTrDusSvwhRDPmZMSB"
        },
        {
          "name": "A Mansion On The Hill - Show 4",
          "id": "3wiA8kHhrt3xGb0R4NLhuR"
        },
        {
          "name": "All My Rowdy Friends (Have Settled Down)",
          "id": "7hBrO5jpSGEbd9X6zxGxQI"
        },
        {
          "name": "All My Rowdy Friends Are Coming Over Tonight",
          "id": "67S1POEmchWHyss0nboDDN"
        },
        {
          "name": "Alone And Forsaken - Single Version",
          "id": "6jO0pvFQl7tAuUg7xLXTzK"
        },
        {
          "name": "Born To Boogie",
          "id": "6HWxEyoPL8XmjRsjTzEees"
        },
        {
          "name": "Cocaine Blues",
          "id": "3pIh9pn55Y17CkDbAHVL3y"
        },
        {
          "name": "Cold, Cold Heart - Single Version",
          "id": "42GunE9yYR5jc1o22hguL2"
        },
        {
          "name": "Country Heroes",
          "id": "70PPOFwmuD4luTtLpnjesg"
        },
        {
          "name": "Crazed Country Rebel",
          "id": "3pPirtTb893uRSatvGmy4v"
        },
        {
          "name": "D Ray White",
          "id": "6CNWBhxQaliNFQnMXXaoRs"
        },
        {
          "name": "Dick In Dixie",
          "id": "68WU06CXI9FHbPiGUmRJyK"
        },
        {
          "name": "Dinosaur",
          "id": "0SW6NfA6MTCC6OWNt6SAkV"
        },
        {
          "name": "Family Tradition",
          "id": "2lYMQJyM2LOGEG3rVkdFod"
        },
        {
          "name": "Hey, Good Lookin'",
          "id": "6qwEFWWjQIER6cCPzDFoD5"
        },
        {
          "name": "Honky Tonk Blues - 1952 Single Version",
          "id": "0zqPgG39ShQfffWACFlrMf"
        },
        {
          "name": "Honky Tonkin' - 1947 Single Version",
          "id": "57ZlcBdq1JJTkae3MbzPXM"
        },
        {
          "name": "I Saw The Light - Single Version",
          "id": "7bISDfujj0qz7Ol9i249uN"
        }
      ],
      "position": 73
    },
    {
      "name": "Eagles",
      "id": "0ECwFtbIWEVNwjlrfc6xoL",
      "Musics": [
        {
          "name": "Already Gone",
          "id": "0CKxrnF9KplS21LTjkkqsW"
        },
        {
          "name": "Complexity",
          "id": "5AEiOH4Mj3qtkNpU1hLXPL"
        },
        {
          "name": "Desperado",
          "id": "0xr6JfHP509FYS4GqigWKC"
        },
        {
          "name": "Get Over It",
          "id": "01PipIL0xsD3BdD776oaeN"
        },
        {
          "name": "Got A Woman",
          "id": "4GazJWRjeHz9F5kEkkQDOR"
        },
        {
          "name": "Got The Power",
          "id": "6h5Jtvoav2YlUiDAp9mHCx"
        },
        {
          "name": "Heartache Tonight",
          "id": "2bzgKuK3pVez40qUvo8sYr"
        },
        {
          "name": "Hotel California",
          "id": "3dTGR2oQA1XaC850o5oPdK"
        },
        {
          "name": "I Can't Tell You Why",
          "id": "5FDeJufgVHIg49jD3k2MrZ"
        },
        {
          "name": "I Love You All The Time",
          "id": "7p8psse2Waz87IMWYypcOl"
        },
        {
          "name": "I Only Want You",
          "id": "2ibjGwv7Vbu0XPh1wrkreK"
        },
        {
          "name": "Journey Of The Sorcerer",
          "id": "3OcBH9Vzd1UwJkQd3r1dVG"
        },
        {
          "name": "Learn To Be Still",
          "id": "4IgzJzTy9oY8Z0ow73ANKA"
        },
        {
          "name": "Life In The Fast Lane",
          "id": "6gXrEUzibufX9xYPk3HD5p"
        },
        {
          "name": "Love Will Keep Us Alive",
          "id": "41RUCd24oEOdw8ry4eAKMZ"
        },
        {
          "name": "Lyin' Eyes",
          "id": "5lQKRR3MdJLtAwNBiT8Cq0"
        },
        {
          "name": "Miss Alissa",
          "id": "0YQXMFYxfHNagYPgQvurKH"
        },
        {
          "name": "New Kid In Town",
          "id": "6Zyz8lsnMFpIrCTuvGurCB"
        },
        {
          "name": "New York Minute",
          "id": "2McC2yGhSRW3DePKcCooQS"
        },
        {
          "name": "Oh Girl",
          "id": "05Gw7eABWjhFh3yM9EtPj4"
        }
      ],
      "position": 74
    },
    {
      "name": "The Shirelles",
      "id": "0x83OBqixqdCHnStP5VMcn",
      "Musics": [
        {
          "name": "A Last Minute Miracle",
          "id": "1wUleNxYgCwy0GZtndVd7z"
        },
        {
          "name": "A Thing Of The Past",
          "id": "7yg0J6AuFKGF78mmy1req3"
        },
        {
          "name": "Abra Ka Dabra",
          "id": "02MxF4ePwelHj5ZZKypjup"
        },
        {
          "name": "Baby It's You",
          "id": "6bdvinFqoNmIOSYOqHWKxv"
        },
        {
          "name": "Big John (Ain't You Gonna Marry Me)",
          "id": "66DlWD7XjzMfrLeppQWCYq"
        },
        {
          "name": "Boys",
          "id": "5gbnpPSUFVrvwKFtlb2GNj"
        },
        {
          "name": "Dedicated To The One I Love",
          "id": "0gcJYi0reGtzqF3WzQHG0I"
        },
        {
          "name": "Don't Say Goodnight And Mean Goodbye",
          "id": "7BZUmtqjIHbhxlePH1oO9z"
        },
        {
          "name": "Everybody Loves A Lover",
          "id": "3K0sJAEu0kbYyCllf8yRyv"
        },
        {
          "name": "Foolish Little Girl",
          "id": "093adSf9ll30BEpggrfask"
        },
        {
          "name": "Hard Times",
          "id": "5gxZtanTjzgsxjhfFUq8Cm"
        },
        {
          "name": "I Didn't Mean To Hurt You",
          "id": "6ZrlE5DF9rvXqTtap0zvSs"
        },
        {
          "name": "I Don't Think So",
          "id": "7It50idy19yh4KpFIDdozr"
        },
        {
          "name": "I Met Him On A Sunday",
          "id": "5FWLUMdWgvpzWvfyIzvlln"
        },
        {
          "name": "Make the Night a Little Longer",
          "id": "4vn8nJzNVtHoZ2iaVOv7T7"
        },
        {
          "name": "Mama Said",
          "id": "4vLqDSoEz0zbfLHXcsygFi"
        },
        {
          "name": "Not For All The Money In The World",
          "id": "58e6Z9liRuHMvXxAE2zDri"
        },
        {
          "name": "Only Time Will Tell",
          "id": "36Zd2q3MAL8wS7TyYoqfgX"
        },
        {
          "name": "Ooh Poo Pah Doo",
          "id": "3tgG5YCHVgUTPsh4PQCfNW"
        },
        {
          "name": "Sha La La",
          "id": "0Xi2XCaLKGy9J92rq0AGps"
        }
      ],
      "position": 75
    },
    {
      "name": "Beastie Boys",
      "id": "03r4iKL2g2442PT9n2UKsx",
      "Musics": [
        {
          "name": "14th St. Break",
          "id": "45DRSW1sFbLc0PMDVoGfb6"
        },
        {
          "name": "B For My Name",
          "id": "3yTSfs23jlTlN5P50qdJLW"
        },
        {
          "name": "B-Boys Makin' With The Freak Freak",
          "id": "6WLLZfhaancZg4cVPuIKFq"
        },
        {
          "name": "Body Movin'",
          "id": "4bag31ZolrskT7TnWSBToU"
        },
        {
          "name": "Brass Monkey",
          "id": "6MzdzJ4hkHJWROmUzED9yP"
        },
        {
          "name": "Ch-Check It Out",
          "id": "56H98l4uinRifnTH8e308N"
        },
        {
          "name": "Don't Play No Game That I Can't Win (featuring Santigold)",
          "id": "1Emrs7nn0qSeoCzSRApiFK"
        },
        {
          "name": "Electric Worm",
          "id": "4rh8jqSakWZ3NXqj2V5a6t"
        },
        {
          "name": "Fight For Your Right",
          "id": "1O2DYAwaGNRkGPGKEGpxo5"
        },
        {
          "name": "Flute Loop",
          "id": "1yUl2G3VJdkidTqXWBt2UD"
        },
        {
          "name": "Funky Donkey",
          "id": "2O3XyDd8i3pwBvSe7QlVtN"
        },
        {
          "name": "Futterman's Rule",
          "id": "4Q6fVlh4BIfyTnKgb1c3Rt"
        },
        {
          "name": "Get It Together",
          "id": "6aaPceG6TnixvAZQ1wBMdp"
        },
        {
          "name": "Girls",
          "id": "3IATwh7G7c3eempoui1eSy"
        },
        {
          "name": "Gratitude - 2009 Digital Remaster",
          "id": "7G7JZECVScySAqBhgO8C3k"
        },
        {
          "name": "Hey Ladies - Digitally Remastered 2005",
          "id": "0g5nx0oV91RtFtFLWHTRV3"
        },
        {
          "name": "Hold It Now, Hit It",
          "id": "14DAnZLeTOrWPP04ZIlUZx"
        },
        {
          "name": "I Don't Know - 2009 Digital Remaster",
          "id": "10FLYqpqDN4uo6eWtD6WEB"
        },
        {
          "name": "Intergalactic - 2009 Digital Remaster",
          "id": "5fpizYGbi5IQoEraj6FP0R"
        },
        {
          "name": "Make Some Noise",
          "id": "2Bz2Q1JNwwPj40T9AvzE7f"
        }
      ],
      "position": 76
    },
    {
      "name": "The Stooges",
      "id": "4BFMTELQyWJU1SwqcXMBm3",
      "Musics": [
        {
          "name": "1969",
          "id": "4nJCE9UyNXhuERnSX8YgSH"
        },
        {
          "name": "1970",
          "id": "0L7F1blNNYj3AjIu4gCjhP"
        },
        {
          "name": "Ann",
          "id": "5Amt4QBz4NkIkN796yz6Xo"
        },
        {
          "name": "Beat That Guy",
          "id": "0MKy9SJDvEKwsO2iA8gPRY"
        },
        {
          "name": "Burn",
          "id": "1y5idR1kxHTpOQ8yeFkUQ3"
        },
        {
          "name": "Dd's",
          "id": "4w2tt48JX3JMh8VTHgsN4k"
        },
        {
          "name": "Dirt",
          "id": "21xrImrAULwa0VT8n4BJoA"
        },
        {
          "name": "Down On The Street",
          "id": "3mQ9xerl37SNwKdYsLaD12"
        },
        {
          "name": "Fun House",
          "id": "07qoAjE0wObVAAfyIevTNV"
        },
        {
          "name": "Gun",
          "id": "16zhXwpMy0x8erVZUS9udm"
        },
        {
          "name": "I Wanna Be Your Dog",
          "id": "7KUk5KbWXbwW4SSQM2vCJT"
        },
        {
          "name": "I'm Sick Of You",
          "id": "3uUkXb97TvEofX3uxRWOv3"
        },
        {
          "name": "Job",
          "id": "6dmnWz8tyl3s3c7ta4XOf0"
        },
        {
          "name": "L.A. Blues",
          "id": "1ED6dMdVwXGkXAjsJdk5f0"
        },
        {
          "name": "Little Doll",
          "id": "7N3iRcPV8z5jcbAsvNs5Aw"
        },
        {
          "name": "Loose",
          "id": "4giZRI3pgupzawIJXLx7T9"
        },
        {
          "name": "My Idea Of Fun",
          "id": "406huHGjSj2bz0cnoeGI8j"
        },
        {
          "name": "No Fun",
          "id": "7DDuClDoC1niziuParyepP"
        },
        {
          "name": "Not Right",
          "id": "0lcuhtx0HtZeWFUYFqIi5P"
        },
        {
          "name": "Ready to Die",
          "id": "4sQqIOPaftyNIZneUXRrUX"
        }
      ],
      "position": 77
    },
    {
      "name": "The Four Tops",
      "id": "7fIvjotigTGWqjIz6EP1i4",
      "Musics": [
        {
          "name": "Standing In The Shadows Of Love (feat. The Four Tops)",
          "id": "0G7w92t62UDS2WhOCcnSzU"
        }
      ],
      "position": 78
    },
    {
      "name": "Elvis Costello",
      "id": "2BGRfQgtzikz1pzAD0kaEn",
      "Musics": [
        {
          "name": "(I Don't Want To Go To) Chelsea",
          "id": "3bEG0prVk08TGDjbYDh77Q"
        },
        {
          "name": "Accidents Will Happen",
          "id": "4ZKg0OfpmcnFBVxZrZfISA"
        },
        {
          "name": "Alison",
          "id": "6e3qHQtKdbNhUVuuNNsyqD"
        },
        {
          "name": "Back Stabbers",
          "id": "2U14q7LqWtWjoe5o6oQOWW"
        },
        {
          "name": "Beyond Belief",
          "id": "0z5yBrEtBkCy7Dsl0G8V2H"
        },
        {
          "name": "Every Day I Write The Book",
          "id": "4QxbVxTiWHrXGDpgExS14a"
        },
        {
          "name": "Everyday I Write The Book - Live At The Wiltern, Los Angeles, CA/2011",
          "id": "6nVIqzzUNTUlwYJ96qrTm4"
        },
        {
          "name": "Fairly Right",
          "id": "6fpc19XB3wOComt7AuNt6a"
        },
        {
          "name": "Good Year For The Roses",
          "id": "2dBxeiWrHUFy9sy8YvdzWH"
        },
        {
          "name": "Hoover Factory",
          "id": "0H5KhIF3gjhaaEMCOyx7lJ"
        },
        {
          "name": "I Want You",
          "id": "0ub8kEcn6JkRNZ9Of5NX9x"
        },
        {
          "name": "I'll Never Fall In Love Again",
          "id": "5aYR2yKYdcWxX7gAO2CYps"
        },
        {
          "name": "In The Darkest Place",
          "id": "1Giq0MpFjm3TVVHRSCWs0x"
        },
        {
          "name": "Less Than Zero",
          "id": "5aPLua8QeuETyXVK8X0CdB"
        },
        {
          "name": "Lover's Walk",
          "id": "7AD8eCUwzcKPZyBM5UdXgA"
        },
        {
          "name": "Miracle Man",
          "id": "5FUTiShzlHi6lkLv3KfhgE"
        },
        {
          "name": "My Mood Swings",
          "id": "47hC0Blvx69Ej0jJfEOPQL"
        },
        {
          "name": "No Action",
          "id": "0k82VIkfiWXRTO92vf4K0h"
        },
        {
          "name": "Oliver's Army",
          "id": "2562d0NXwYOKAsDP0ABMX7"
        },
        {
          "name": "Pump It Up",
          "id": "3KHc4GI82IqpFfWo4JiHPF"
        }
      ],
      "position": 79
    },
    {
      "name": "The Drifters",
      "id": "1FqqOl9itIUpXr4jZPIVoT",
      "Musics": [
        {
          "name": "Bip Bam (with Clyde McPhatter)",
          "id": "2ohbZgw4yyWbkm5TbR2QLz"
        },
        {
          "name": "Dance With Me",
          "id": "3W0sGNPnUe5SVftz1YMQC3"
        },
        {
          "name": "Drip Drop",
          "id": "672bYvh0ygZMrUvRr6hN4P"
        },
        {
          "name": "Fools Fall In Love",
          "id": "6V7KP8cBGKFMMvsWwNoRyh"
        },
        {
          "name": "Honey Love (with Clyde McPhatter)",
          "id": "0wK6j35xxeH96PWULdAR7f"
        },
        {
          "name": "I Feel Good All Over",
          "id": "3Df1kd14lycyx31sPP3XxI"
        },
        {
          "name": "I'll Take You Home",
          "id": "2eFTEkvuCiR0KsgUbo9WqM"
        },
        {
          "name": "I've Got Sand In My Shoes",
          "id": "7jon8ItjfPNUkn9cWtkhnT"
        },
        {
          "name": "If You Don't Come Back",
          "id": "52Y2jLBLNMO8Qovlbiapd3"
        },
        {
          "name": "Jet Black - 1995 Remastered Version",
          "id": "1Hot9CroNqQCOugWJSGbGx"
        },
        {
          "name": "Kissin' in the Back Row of the Movies",
          "id": "3XPX8bOozgShCrhWbLC0ZL"
        },
        {
          "name": "Living Doll - 1996 Remastered Version",
          "id": "1Mxt1Z09YpIhmJTTYiTMV7"
        },
        {
          "name": "Money Honey (with Clyde McPhatter)",
          "id": "2xSoBcjJX9MlC2WyW5hf3t"
        },
        {
          "name": "On Broadway",
          "id": "3CH8M5lB931faZDzjCTfVW"
        },
        {
          "name": "One Way Love",
          "id": "3Wtlrgl7wlDUg2OLpG8UY0"
        },
        {
          "name": "Please Stay",
          "id": "32v16B1DR9wopKenCpM7a0"
        },
        {
          "name": "Ruby Baby",
          "id": "7BGcvbQzim24bB3yUQSbhZ"
        },
        {
          "name": "Saturday Night At The Movies",
          "id": "2oJaCsDjCujzOL75Oi3KaS"
        },
        {
          "name": "Save The Last Dance For Me",
          "id": "5b3g5sfuLubcHZxaJ1JmX9"
        },
        {
          "name": "Some Kind Of Wonderful",
          "id": "13WzZYUsyhqTcj9VcgPEIQ"
        }
      ],
      "position": 80
    },
    {
      "name": "Creedence Clearwater Revival",
      "id": "3IYUhFvPQItj6xySrBmZkd",
      "Musics": [
        {
          "name": "Bad Moon Rising",
          "id": "2kyBz2bXWUQDL26Aigex0X"
        },
        {
          "name": "Before You Accuse Me",
          "id": "2aCLXIODwfJskmFnVXFity"
        },
        {
          "name": "Born On The Bayou",
          "id": "2JyoTSZozy8aQmEOLw2nA7"
        },
        {
          "name": "Cotton Fields",
          "id": "25fowDvPAUn4hUkZKzudZp"
        },
        {
          "name": "Don't Look Now - Live",
          "id": "1r5xcapoZlTeiGKxOD9kSG"
        },
        {
          "name": "Down On The Corner",
          "id": "4YMLW13PuuO7o3jkIWlKAs"
        },
        {
          "name": "Fortunate Son",
          "id": "3yI282DoIJyERd0vGukMoB"
        },
        {
          "name": "Green River",
          "id": "1ZqIGtOBYa6cA6ztv2GEro"
        },
        {
          "name": "Have You Ever Seen The Rain?",
          "id": "2LawezPeJhN4AWuSB0GtAU"
        },
        {
          "name": "Hey Tonight",
          "id": "1us3KnKM5KaHmlohOjAl1a"
        },
        {
          "name": "I Heard It Through The Grapevine",
          "id": "5rnCU9iGOM2rQZZssa87Cg"
        },
        {
          "name": "I Put A Spell On You",
          "id": "1XMP99GU4f6UemfWiNoXHE"
        },
        {
          "name": "Lodi",
          "id": "5CdUzhEaEWROxjc91PD18A"
        },
        {
          "name": "Long As I Can See The Light",
          "id": "3vMT0vgfMCysGw38B2nkOD"
        },
        {
          "name": "Lookin' Out My Back Door",
          "id": "1dSsswb9lTyp7XseBSwKxM"
        },
        {
          "name": "Midnight Special",
          "id": "7vLw0YX0l4D0q2nWuKNzkp"
        },
        {
          "name": "Molina",
          "id": "5y3f0HzXlMbge94XeyEFiV"
        },
        {
          "name": "Ooby Dooby",
          "id": "6XeF5jkCUbgCTymF2gLSdL"
        },
        {
          "name": "Proud Mary",
          "id": "5Op2Ra4kgzlTpEmD9NUanY"
        },
        {
          "name": "Ramble Tamble",
          "id": "6fdAGzFIlN3QMpxLo6jIAn"
        }
      ],
      "position": 81
    },
    {
      "name": "Eminem",
      "id": "7dGJo4pcD2V6oG8kP0tJRR",
      "Musics": [
        {
          "name": "'Till I Collapse",
          "id": "6yr8GiTHWvFfi4o6Q5ebdT"
        },
        {
          "name": "25 To Life",
          "id": "64XdaHjuyOQmVRdqn7aCgB"
        },
        {
          "name": "Ass Like That",
          "id": "0HNAPf0cLMkVQfwPl74kF3"
        },
        {
          "name": "Bad Guy",
          "id": "6qQJLFpmM0bx5FKNr5pDfV"
        },
        {
          "name": "Beautiful",
          "id": "7n8UWYTawkrcC1KBsY5XRc"
        },
        {
          "name": "Berzerk",
          "id": "2vbWpgFRbqbVZFybdCgm6M"
        },
        {
          "name": "Business",
          "id": "4PbhV8BYpnga2zdeSeqhcw"
        },
        {
          "name": "Campaign Speech",
          "id": "6UAt8czTmPX4IXQNXgbxMv"
        },
        {
          "name": "Cinderella Man",
          "id": "318d3zDZXOxJGU24epWw32"
        },
        {
          "name": "Cleanin' Out My Closet",
          "id": "78ce4gBp4x0JfSpzIvDdZo"
        },
        {
          "name": "Cold Wind Blows",
          "id": "7mliwEVqxIuwLmHdTXlBrx"
        },
        {
          "name": "Forever",
          "id": "31Q9ZTF9x81BDonlObCbvP"
        },
        {
          "name": "Forgot About Dre",
          "id": "0Zh5U48tZNeAzzLTV1CVBE"
        },
        {
          "name": "Guts Over Fear",
          "id": "3pAnZV3mgNKCABheAUatc3"
        },
        {
          "name": "I Need A Doctor",
          "id": "1aUT4xl8iiYNr6emik4qTB"
        },
        {
          "name": "Just Lose It",
          "id": "6v6WjsyLdY189IewecL2x7"
        },
        {
          "name": "Kill You",
          "id": "6Lcq8nlk2InTcLHwGj7vQN"
        },
        {
          "name": "Like Toy Soldiers",
          "id": "6AnfqcIa7IyrCMtgh5P6Wc"
        },
        {
          "name": "Lose Yourself - Soundtrack Version",
          "id": "7w9bgPAmPTtrkt2v16QWvQ"
        },
        {
          "name": "Love The Way You Lie",
          "id": "6UaRii9AH6Zss9xNMEQ2M9"
        }
      ],
      "position": 82
    },
    {
      "name": "James Taylor",
      "id": "0vn7UBvSQECKJm2817Yf1P",
      "Musics": [
        {
          "name": "Angels Of Fenway",
          "id": "1UO8fti01DReWoROLOQYj7"
        },
        {
          "name": "Carolina In My Mind",
          "id": "2T5Ch09nefwckOu5NQvjIk"
        },
        {
          "name": "Country Road",
          "id": "7iMT9dte1Ml23gxj6k88wx"
        },
        {
          "name": "Don't Let Me Be Lonely Tonight",
          "id": "7bOTLy3V2DdyqSzdbrJ5x1"
        },
        {
          "name": "Don't Try So Hard",
          "id": "4vGzR5dRP28zgnLY6DNDEY"
        },
        {
          "name": "Fire And Rain",
          "id": "11HzdiXQhDjMkBDwR9OpTJ"
        },
        {
          "name": "Handy Man",
          "id": "2kuTmskJFZW1L3FMMJFSFp"
        },
        {
          "name": "Her Town Too",
          "id": "3ukAkL7aLVrDf7x2XiUkNZ"
        },
        {
          "name": "How Sweet It Is (To Be Loved By You)",
          "id": "0tIcmEpt0XcIsWG5NAw7bC"
        },
        {
          "name": "Long Ago And Far Away",
          "id": "4XiMAlBFq7jMYx43VaHd7L"
        },
        {
          "name": "Love Will Keep Us Together",
          "id": "5yJWtlxRvj6RKxE6779J4h"
        },
        {
          "name": "Mexico",
          "id": "0VOIJT3Gz8uStYHHBGAUj1"
        },
        {
          "name": "Montana",
          "id": "0rVT5gg7kyfrBwSk4EGB70"
        },
        {
          "name": "Only One",
          "id": "05re487C0a3bJNZnPfDqMp"
        },
        {
          "name": "Our Town - From \"Cars\"",
          "id": "5Dd3ZmgZJBQ13VvLTN0xhV"
        },
        {
          "name": "Sailing To Philadelphia",
          "id": "3SSdgcic8a3hVaPytpQsiJ"
        },
        {
          "name": "Secret O'Life",
          "id": "2dBOatuBZV3zYngZLAEbrv"
        },
        {
          "name": "Shower The People",
          "id": "2nS97pxr0xqY5adAi5LFAv"
        },
        {
          "name": "Something In The Way She Moves",
          "id": "69foTA1ElY03DJQb7bbA0e"
        },
        {
          "name": "Steamroller",
          "id": "0q61wu01SMT4qa1onvDkQk"
        }
      ],
      "position": 83
    },
    {
      "name": "Black Sabbath",
      "id": "5M52tdBnJaKSvOpJGz8mfZ",
      "Musics": [
        {
          "name": "A Hard Road",
          "id": "3PFvZfn6STIhKV7Vfky63y"
        },
        {
          "name": "Am I Going Insane? - Radio",
          "id": "6O9tI9GxJPqVhSuEJFObY8"
        },
        {
          "name": "Behind the Wall of Sleep",
          "id": "5HS4UGzEl1XD9y1yihxrxk"
        },
        {
          "name": "Black Sabbath",
          "id": "6ag5uZHqIkrbFeaF3NvmO4"
        },
        {
          "name": "Changes",
          "id": "19PJBiR4bvseaQ04tdrHDM"
        },
        {
          "name": "Children of the Grave",
          "id": "5kmYK5yFcKGgrEdNKxMK47"
        },
        {
          "name": "Deathmask/Into the Void",
          "id": "7jffphIXrVfzAy2xQ8uKCS"
        },
        {
          "name": "Dirty Women",
          "id": "2Rg5nEafk9ROJS4VWkKxsg"
        },
        {
          "name": "Electric Funeral",
          "id": "1VlD4mNlDxOUQQID6z7paD"
        },
        {
          "name": "Embryo",
          "id": "1MK5eMB0Q8Ro4goJT94Cqb"
        },
        {
          "name": "Evil Woman (Don't Play Your Games With Me)",
          "id": "5NYwL0NzC7VOUKrcCwlRTr"
        },
        {
          "name": "Fairies Wear Boots",
          "id": "5IO4uhChdZIbbZXis3YbgQ"
        },
        {
          "name": "God Is Dead?",
          "id": "42wFRybIJ2n5RoD7r9R8Rz"
        },
        {
          "name": "Heaven and Hell",
          "id": "13zmzwQNK2EOJ9zp8yrt47"
        },
        {
          "name": "Hole in the Sky",
          "id": "1Ys1m82Zbf88u0Uwi6mE3L"
        },
        {
          "name": "Iron Man",
          "id": "4BWtaaeVIRsR5HgLfuJAB9"
        },
        {
          "name": "It's Alright",
          "id": "6I78esoJRrCRJ40JbKVPBv"
        },
        {
          "name": "Jack the Stripper/Fairies Wear Boots",
          "id": "7tSStun2fRxiexlrwC9Bmt"
        },
        {
          "name": "Killing Yourself to Live",
          "id": "7evCvHSkmnOEbqt1vc3fVp"
        },
        {
          "name": "Lord of This World",
          "id": "3llANVVnFIY1sM1HMLiynq"
        }
      ],
      "position": 84
    },
    {
      "name": "Tupac Shakur",
      "id": "1ZwdS5xdxEREPySFridCfh",
      "Musics": [
        {
          "name": "2 Of Amerikaz Most Wanted",
          "id": "5Ddu4AaN1VaZ1MTg1neCl7"
        },
        {
          "name": "All About U",
          "id": "7HFl64GKBtPTa5YoW7j4jL"
        },
        {
          "name": "All Eyez On Me",
          "id": "2xTft6GEZeTyWNpdX94rkf"
        },
        {
          "name": "Ambitionz Az A Ridah",
          "id": "3ssX20QT5c3nA9wk78V1LQ"
        },
        {
          "name": "Breathin",
          "id": "2lCdyF2a9EcdBD7C6c99iI"
        },
        {
          "name": "California Love (remix)",
          "id": "2pwTzYUTIiwF7Pn8ygXD91"
        },
        {
          "name": "Can't C Me",
          "id": "09EwNbGvUyu7BDEYG0cJro"
        },
        {
          "name": "Changes - (Explicit)",
          "id": "3fLJfEJuyfZVYJ01BB9vnV"
        },
        {
          "name": "Check Out Time",
          "id": "6KNUrRgzrccGtJpGdP39GU"
        },
        {
          "name": "Dear Mama",
          "id": "2wdHKp5CBgJ8mlO7Cq84Xd"
        },
        {
          "name": "Do For Love",
          "id": "3dSGqXMll4UJUohLANG0ce"
        },
        {
          "name": "Ghetto Gospel",
          "id": "2MQ51y5NhCyva4SgWmK2Me"
        },
        {
          "name": "Ghost",
          "id": "6HHCuDsieOiTZEr4cSCsz5"
        },
        {
          "name": "Got My Mind Made Up",
          "id": "3AYFNoXF0xw5Shsg0lHvBn"
        },
        {
          "name": "Hail Mary (feat. The Outlawz)",
          "id": "00AvOVhsUi1gOCnHxTFw7i"
        },
        {
          "name": "Heartz Of Men",
          "id": "4NrG279pDVphLmS1e2JVWp"
        },
        {
          "name": "Heaven Ain't Hard 2 Find",
          "id": "0BUl2dAZtoyQnpQRQT3yiy"
        },
        {
          "name": "Hit 'em Up",
          "id": "6WLTmiz0i2R938j1KMcSVk"
        },
        {
          "name": "How Do You Want It",
          "id": "1eduDdsjMO7Or4EXnMf2iS"
        },
        {
          "name": "I Ain't Mad At Cha",
          "id": "0ZDcLapel9chZ15ZNuOdD4"
        }
      ],
      "position": 85
    },
    {
      "name": "Gram Parsons",
      "id": "1KA3WXYMPLxomNuoE22LYd",
      "Musics": [
        {
          "name": "$1000 Wedding (Remastered Album Version)",
          "id": "67nZEOZ5re0q0IueyF1dKc"
        },
        {
          "name": "1000 Dollar Wedding - Solo Alternate Take",
          "id": "50TNJk9JBO1LmQJHc95PqO"
        },
        {
          "name": "A Song For You",
          "id": "044sG5pgwwUSXBekDecuZH"
        },
        {
          "name": "Big Mouth Blues (Remastered Album Version)",
          "id": "1pO336x9dmdiVMhsFDhWIh"
        },
        {
          "name": "Brass Buttons (Remastered Album Version)",
          "id": "6Bijmp2RULR8SgmpqRe7tx"
        },
        {
          "name": "Close Up the Honky Tonks",
          "id": "0OkcBwEfHmJxzXNMEP86j9"
        },
        {
          "name": "Country Baptizing - 1973 Live Version",
          "id": "3njCVt6ZM9aWUuvHjjFQGi"
        },
        {
          "name": "Cry One More Time (Remastered Album Version)",
          "id": "1UuwX6gKxF3qSK01oy1J2x"
        },
        {
          "name": "Dark End of the Street",
          "id": "1uhojuE2jK2iW1xgB5t5U4"
        },
        {
          "name": "Hearts On Fire (Remastered Album Version)",
          "id": "3THXntC8T110BDg3X8OaOf"
        },
        {
          "name": "Hickory Wind - Alternate Version",
          "id": "7FE9gpMY21ujjILiOsfaM0"
        },
        {
          "name": "Hot Burrito #1 - Solo Alternate Take",
          "id": "4X1vJ5LeFnTV51j7BvidLn"
        },
        {
          "name": "How Much I've Lied (Remastered Album Version)",
          "id": "3O6VIBY19sL2EDO3nWAdJ0"
        },
        {
          "name": "I Can't Dance (Remastered Album Version)",
          "id": "2NY6C7Eo5YNUsOK6y9Nxk1"
        },
        {
          "name": "In My Hour Of Darkness (Remastered Album Version)",
          "id": "28xYsYblby21yWGCRcF5Cm"
        },
        {
          "name": "Kiss The Children (Remastered Album Version)",
          "id": "3TIMSziHVPWUoRhSutgRnV"
        },
        {
          "name": "Long Black Limousine",
          "id": "5ljNpfnLPk4xiM5i2D1rUh"
        },
        {
          "name": "Love Hurts (Remastered Album Version)",
          "id": "72DefuF22C6aPKrWhRFCBS"
        },
        {
          "name": "Medley Live From Northern Quebec [A] Cash On The Barrelhead [B] Hickory Wind (Remastered Version)",
          "id": "1J4VSGnisSb9ECF8z7pCPQ"
        },
        {
          "name": "Ooh Las Vegas (Remastered Album Version)",
          "id": "7kJpAkJSFMCkM6T4plsRLd"
        }
      ],
      "position": 86
    },
    {
      "name": "Jay Z",
      "id": "3nFkdlSjzX9mRTtwJOzDYB",
      "Musics": [
        {
          "name": "99 Problems",
          "id": "1l6DvDFssUqMnsFJNFnrRJ"
        },
        {
          "name": "All The Way Up (Remix)",
          "id": "2AYTGaclgKXACh13nJRVcV"
        },
        {
          "name": "Big Pimpin'",
          "id": "4m1B88bynbZIVnrDsUINYc"
        },
        {
          "name": "Big Pimpin'/Papercut",
          "id": "4DLH2fr8pWX1iksMrk47Kw"
        },
        {
          "name": "Bitch, Don’t Kill My Vibe - Remix",
          "id": "4wshBvO4qMrxJnPlfkeUWi"
        },
        {
          "name": "Clique",
          "id": "2WBjsxTE3hBInd21yUY65h"
        },
        {
          "name": "Crazy In Love",
          "id": "0TwBtDAWpkpM3srywFVOV5"
        },
        {
          "name": "Deja Vu",
          "id": "2MAyGB3UgAbbT1Fjc7b7aA"
        },
        {
          "name": "Dirt Off Your Shoulder",
          "id": "3hnwI9X0fgitO3CljHzh2M"
        },
        {
          "name": "Dirt Off Your Shoulder/Lying From You",
          "id": "7dvd3b2oz7AFgXrPBIIYxR"
        },
        {
          "name": "Drunk in Love",
          "id": "5EmCpD8tUj78VW3kgaEjME"
        },
        {
          "name": "Drunk in Love Remix",
          "id": "0FZmAvivvifvtN3pZScbw1"
        },
        {
          "name": "F*ckwithmeyouknowigotit",
          "id": "45kgqsq1g9liM5tvdKNhLa"
        },
        {
          "name": "Frontin' - Radio Mix/Club Mix",
          "id": "0iFOG4Ki9aDmJUYUFHQlPG"
        },
        {
          "name": "Hard Knock Life (Ghetto Anthem)",
          "id": "6CWiDYxP6pZg2WwYuYg4Ol"
        },
        {
          "name": "Heartbreaker",
          "id": "0jsANwwkkHyyeNyuTFq2XO"
        },
        {
          "name": "Holy Grail",
          "id": "1olNHIIVl4EVwIEPGYIR7G"
        },
        {
          "name": "I Got the Keys",
          "id": "51Nwg5wCDDiqcTntgJUlLo"
        },
        {
          "name": "Izzo/In The End",
          "id": "39sUeHQoIGY6BEIcgTMRXW"
        },
        {
          "name": "Jigga What/Faint",
          "id": "4pnFRnCOfaETea25g0YSvG"
        }
      ],
      "position": 87
    },
    {
      "name": "The Yardbirds",
      "id": "2lxX1ivRYp26soIavdG9bX",
      "Musics": [
        {
          "name": "Boom Boom",
          "id": "4j4O8Jl63XJ3LSWOKSvDJJ"
        },
        {
          "name": "Crying Out For Love",
          "id": "2fqRA6mLe9UxNNBdAJ3Ey1"
        },
        {
          "name": "Dazed And Confused",
          "id": "6FnZOjATjBiw3uuhzjdaEa"
        },
        {
          "name": "Drinking Muddy Water",
          "id": "3moRW9Lleu6w5SpBTyu0oo"
        },
        {
          "name": "Evil Hearted You",
          "id": "5HXQkM9HL5u6NQC1FSbLMU"
        },
        {
          "name": "For Your Love",
          "id": "5bC4y9Zhn6ng0MOzACCHkc"
        },
        {
          "name": "Glimpses - 2003 Remastered Version",
          "id": "4YyonsCutuVTfG6eW7pB8W"
        },
        {
          "name": "Got to Hurry",
          "id": "74bgdMtF2lkmIZwUjpr4Tk"
        },
        {
          "name": "Happenings Ten Years Time Ago",
          "id": "2Nq3vsbcreRCaMEmZa8lwK"
        },
        {
          "name": "Heart Full Of Soul",
          "id": "66OUq8y7T8zg3J4hBH7aDN"
        },
        {
          "name": "Heartfull Of Soul",
          "id": "66omAAULdJGBgVdtL9MMqV"
        },
        {
          "name": "I Ain't Done Wrong",
          "id": "2nADgp0FKvdQHb7iLZsKCM"
        },
        {
          "name": "I'm Not Talking",
          "id": "1OTuiXvdaFcl5Ab4hDZWdL"
        },
        {
          "name": "I'm a Man",
          "id": "2Bi0JWdxDMaKPanNofJSdL"
        },
        {
          "name": "Jeff's Boogie",
          "id": "3CqfZPeQ6t9xujSEVnMowT"
        },
        {
          "name": "Little Games - 2003 Remastered Version",
          "id": "5E7eg8Q0BOTozh8a1a4xaB"
        },
        {
          "name": "Lost Woman",
          "id": "56bNAn1LIqmGTETWnBJTQK"
        },
        {
          "name": "Lost Women - The Mono Album",
          "id": "2Ajtl0ro60h3VN3rD3Y1IF"
        },
        {
          "name": "Mr You're A Better Man Than I",
          "id": "4uLgOR4mvjkTcsLEhLShWm"
        },
        {
          "name": "My Blind Life",
          "id": "7vtNXzD8VrPejsq2tUY9ii"
        }
      ],
      "position": 88
    },
    {
      "name": "Carlos Santana",
      "id": "6GI52t8N5F02MxU0g5U69P",
      "Musics": [
        {
          "name": "(Da Le) Yaleo",
          "id": "3ZJMi7jX3j34ORbXFjrzQi"
        },
        {
          "name": "Africa Bamba",
          "id": "2otqdqFz0UIrHlxJYWJrDB"
        },
        {
          "name": "Anywhere You Want To Go",
          "id": "20uLgvefcMJp0LqnQm5DNj"
        },
        {
          "name": "Black Magic Woman",
          "id": "4nmne9J3YCEdhvjTzwiAgu"
        },
        {
          "name": "Black Magic Woman / Gypsy Queen",
          "id": "7cDxjUnMitNKQC5c8RQUko"
        },
        {
          "name": "Corazon Espinado",
          "id": "2WoqgtWEBbbBKMDN6Becs7"
        },
        {
          "name": "Do You Like the Way",
          "id": "7dP57u5hv9TqZnfTlklyrt"
        },
        {
          "name": "Europa \"Earth's Cry Heaven's Smile\"",
          "id": "5W3em0DY0SekwzfSG9Fy4K"
        },
        {
          "name": "Europa (Earth's Cry Heaven's Smile)",
          "id": "5Yp3e8RcjYevBTZYJ7OD7s"
        },
        {
          "name": "Evil Ways",
          "id": "5tmrnhMxx39jnu3kjopMdP"
        },
        {
          "name": "Hold On",
          "id": "1NZAeh2a8Y6Ry5hGBPGP1e"
        },
        {
          "name": "I'm Feeling You",
          "id": "0n3hdlinZYNly8NqAtvJHu"
        },
        {
          "name": "Illegal",
          "id": "4O1xKPHOH7iXlzMNUDuxHS"
        },
        {
          "name": "Into the Night",
          "id": "5Hv1QAbRWrUSUHaT0CmnMS"
        },
        {
          "name": "Iron Lion Zion",
          "id": "1sCfYZLKuW5OJ5AZQxIgj8"
        },
        {
          "name": "Just Feel Better",
          "id": "3uBcbK8ztChsXB4uZNKh0S"
        },
        {
          "name": "La Flaca",
          "id": "1NC5LcAmP5gJcLWVl5tJvv"
        },
        {
          "name": "Love of My Life",
          "id": "7qtpPSLeZMGv0vrCZu5kxu"
        },
        {
          "name": "Maria Maria - Radio Mix",
          "id": "3fucYASejkSMwtAYjFRKlF"
        },
        {
          "name": "Necio",
          "id": "3DKWF8is9hzp84aSxnhlag"
        }
      ],
      "position": 89
    },
    {
      "name": "Tom Petty",
      "id": "2UZMlIwnkgAEDBsw1Rejkn",
      "Musics": [
        {
          "name": "A Face In The Crowd",
          "id": "66q4BUNLBymfOBzmqZyVl2"
        },
        {
          "name": "A Higher Place",
          "id": "3wNdSbwkdsdr6lq3Wbp86d"
        },
        {
          "name": "A Mind With A Heart Of It's Own",
          "id": "0hlKTZunx60h5kf4yaeFj3"
        },
        {
          "name": "Alright For Now",
          "id": "1v9p2fbQIPaKaqjuT77V5P"
        },
        {
          "name": "American Girl",
          "id": "7MRyJPksH3G2cXHN8UKYzP"
        },
        {
          "name": "Anything That's Rock 'N' Roll",
          "id": "2AX3BnBmNwR2lHZhkKvmXJ"
        },
        {
          "name": "Breakdown",
          "id": "5x53pbGk6sbl1BGom19QQ5"
        },
        {
          "name": "Crawling Back To You",
          "id": "1JenqZNMU6unIwVWmoP3J0"
        },
        {
          "name": "Damaged By Love",
          "id": "0nmdWx4vUUBg33w3TAqWdF"
        },
        {
          "name": "Depending On You",
          "id": "6OcYVYSSdnl2dALasE4wUO"
        },
        {
          "name": "Don't Come Around Here No More",
          "id": "3qqoTjGapBrc7pSaujF1Lr"
        },
        {
          "name": "Don't Do Me Like That",
          "id": "0HTb5ZzHN2BNMMDu7TVKOH"
        },
        {
          "name": "Feel A Whole Lot Better",
          "id": "5ubKzLuAJqJesJiahuyF81"
        },
        {
          "name": "Flirting With Time",
          "id": "2C2QJ1kBUKQu6Iby6RvD2V"
        },
        {
          "name": "Free Fallin'",
          "id": "65AFEdyKBDzOFgdbaydAVG"
        },
        {
          "name": "Honey Bee",
          "id": "7bBJ2wBvhbCiNaZRqG3yTr"
        },
        {
          "name": "I Got The Same Old Blues",
          "id": "1PmPNn8lpamGGWbgVyFrX1"
        },
        {
          "name": "I Will Run To You - Remastered",
          "id": "0V8JQGXe4wY2emqgbm4VZe"
        },
        {
          "name": "I Won't Back Down",
          "id": "0Ir0Esfpcg0EB6Kq8VbbAh"
        },
        {
          "name": "Into The Great Wide Open",
          "id": "1pvEacBCjS7EMQUZbM4Pj8"
        }
      ],
      "position": 90
    },
    {
      "name": "Guns N' Roses",
      "id": "3qm84nBOXUEQ2vnTfUTTFC",
      "Musics": [
        {
          "name": "14 Years",
          "id": "6kuMNhZdF7GgGvmioGc5g2"
        },
        {
          "name": "Ain't It Fun",
          "id": "0WZl1h9J8bOtWF97b9WwPL"
        },
        {
          "name": "Anything Goes",
          "id": "2seAsYG2FiexpXj8UhG9Zk"
        },
        {
          "name": "Bad Obsession",
          "id": "16ran5yZDoDZIzvVqgSXyW"
        },
        {
          "name": "Better",
          "id": "1Mi1hniaDg5dRRn9ZeyJDu"
        },
        {
          "name": "Chinese Democracy",
          "id": "1hykzupmYdotiPrvvlFNR8"
        },
        {
          "name": "Civil War",
          "id": "392JezohHRGrvh4X3lZP8p"
        },
        {
          "name": "Coma",
          "id": "34Lo0oc0QDJ1wlepfnWHQI"
        },
        {
          "name": "Don't Cry",
          "id": "223BS0F1Svs60EYlbftVut"
        },
        {
          "name": "Double Talkin' Jive",
          "id": "3w6pWl4HKLoijkYErNjooW"
        },
        {
          "name": "Dust N' Bones",
          "id": "21gOL3GPwR8Vg91HHpBLsM"
        },
        {
          "name": "Estranged",
          "id": "00hY9G7oTlWd86U3FYzwoH"
        },
        {
          "name": "It's So Easy",
          "id": "63HA3dpnOmdDcazJ9sDfrh"
        },
        {
          "name": "Knockin' On Heaven's Door",
          "id": "4tWN1e3B3hF5gQf6DezWly"
        },
        {
          "name": "Live And Let Die",
          "id": "3AkUGhu2KzyTV1CFXfay4f"
        },
        {
          "name": "Mr. Brownstone",
          "id": "4DnEyHNO8MdhFYFrDq73BV"
        },
        {
          "name": "My Michelle",
          "id": "2dyfo7lqKI7NtSAhUZwnoJ"
        },
        {
          "name": "Nightrain",
          "id": "2vNw57KPaYDzkyPxXYUORX"
        },
        {
          "name": "November Rain",
          "id": "53968oKecrFxkErocab2Al"
        },
        {
          "name": "Out Ta Get Me",
          "id": "0OgjX682GaRCIdbqerNL6g"
        }
      ],
      "position": 91
    },
    {
      "name": "Booker T. & the M.G.s",
      "id": "2vDV0T8sxx2ENnKXds75e5",
      "Musics": [
        {
          "name": "A Woman, A Lover, A Friend",
          "id": "1HvSfBuqF7C5QfJonQpKG8"
        },
        {
          "name": "As the Years Go Passing By - Live",
          "id": "2WewZZ3771m9fxumqG7uMT"
        },
        {
          "name": "Behave Yourself",
          "id": "7viT9kDjq8PIx57sRCID0b"
        },
        {
          "name": "Blue On Green",
          "id": "1mPtfRSwkkQzJtC72dNGGD"
        },
        {
          "name": "Boot-Leg",
          "id": "5lD7jH5fhzLu6YjnvnX0V1"
        },
        {
          "name": "Born On The Bayou - At Fantasy Studios",
          "id": "5Bsqv3RgaJhORisiMvVunp"
        },
        {
          "name": "Can't Be Still",
          "id": "2hwUAsDIKijftnx2vA7Xs8"
        },
        {
          "name": "Chicken Pox",
          "id": "2FMmIodHR7CaHe4Oqx9dzl"
        },
        {
          "name": "Children, Don't Get Weary",
          "id": "5Ddu1icwEiBBxlRsF2QPe1"
        },
        {
          "name": "Chinese Checkers",
          "id": "5uxjeOKf5cDlpxj4aBIwhe"
        },
        {
          "name": "Comin' Home Baby",
          "id": "5gFlfviA4rdCIe2UPTi1yU"
        },
        {
          "name": "Green Onions",
          "id": "4UBkgtFbsrot8GxX4HHb0B"
        },
        {
          "name": "Groovin'",
          "id": "2nhKcmHaeyly4MBN1YQ0V0"
        },
        {
          "name": "Hang 'Em High",
          "id": "6L79Jzo89CBP4LToXd0ZOn"
        },
        {
          "name": "Hip Hug-Her",
          "id": "4lkwEgSppKli27thHdeRgc"
        },
        {
          "name": "Home Grown",
          "id": "1ggx9zkip4YCm0iQ1hywjH"
        },
        {
          "name": "I Got A Woman",
          "id": "4KZsVYEX3h2Zo7TeC1OrVF"
        },
        {
          "name": "I Was Made To Love Her",
          "id": "356OPdbqLSQl6iVSrja6TO"
        },
        {
          "name": "Jelly Bread",
          "id": "3NARfCSnbUG1zV1ns4DBJk"
        },
        {
          "name": "Lonely Avenue",
          "id": "2vEmD8J9uELP7tS5nY2vaJ"
        }
      ],
      "position": 92
    },
    {
      "name": "Nine Inch Nails",
      "id": "0X380XXQSNBYuleKzav5UO",
      "Musics": [
        {
          "name": "13 Ghosts II",
          "id": "1HwDwWdJgbI23mGJpGqBL6"
        },
        {
          "name": "All The Love In The World",
          "id": "25VUzj25PSw7rHidHGd12o"
        },
        {
          "name": "Came Back Haunted",
          "id": "2yj7gR23TNco6AQkztJaRa"
        },
        {
          "name": "Capital G",
          "id": "7qizYfSot8J8Ns6I6a0bra"
        },
        {
          "name": "Closer",
          "id": "4ysiI2bYbXcGT8jMXEPQSk"
        },
        {
          "name": "Copy Of A",
          "id": "4BFKCEp4gwG3QHNlYodLMy"
        },
        {
          "name": "Dead Souls",
          "id": "12s8P9IFXjJWwVnX7u26ca"
        },
        {
          "name": "Discipline",
          "id": "0Z4pLlygCvkTHmeQtYAbNH"
        },
        {
          "name": "Down In It - Remastered",
          "id": "05x6AqD9DSc8m34lYLWDgg"
        },
        {
          "name": "Every Day Is Exactly The Same",
          "id": "11sSvwrDX5BBUhbBZRKUxy"
        },
        {
          "name": "Getting Smaller",
          "id": "47lFMvErjaVjEfjX4lG6ea"
        },
        {
          "name": "Head Like A Hole - Remastered",
          "id": "6mQTh2DuXbCLL3PqAz27Ep"
        },
        {
          "name": "Heresy",
          "id": "3mA1wm6EK7dRxPqJLyzUwx"
        },
        {
          "name": "Hurt",
          "id": "4HbVVd2D3HKYe7PR0uEn1q"
        },
        {
          "name": "Into The Void",
          "id": "3w1x8BZ8zkDqt5pt3IWuEx"
        },
        {
          "name": "Just Like You Imagined",
          "id": "11eSOZQj0od3y6DQHGloSW"
        },
        {
          "name": "La Mer",
          "id": "5EjMYsQL7jkdgbRoGheDVg"
        },
        {
          "name": "Last",
          "id": "0CYjMhYzjHwvSzoG54NFaF"
        },
        {
          "name": "Love Is Not Enough",
          "id": "2g7fPyH1wsEVsoQPGy2hgK"
        },
        {
          "name": "March Of The Pigs",
          "id": "0kvIGHFAeZ4MNBYwQBEZFi"
        }
      ],
      "position": 93
    },
    {
      "name": "Lynyrd Skynyrd",
      "id": "4MVyzYMgTwdP7Z49wAZHx0",
      "Musics": [
        {
          "name": "All I Can Do Is Write About It",
          "id": "2S7IvAqHjeqHFjdsxqDlGa"
        },
        {
          "name": "Call Me The Breeze",
          "id": "1tWE0jWoAAKucTfo3D06eD"
        },
        {
          "name": "Don't Ask Me No Questions",
          "id": "03kF5ufbIdpBkO7dK1PXe8"
        },
        {
          "name": "Down South Jukin'",
          "id": "6mg5GiLRu9JasUVVAGet7u"
        },
        {
          "name": "Every Mother's Son",
          "id": "5GOo8EHn9wfrQCvRv8MuHg"
        },
        {
          "name": "Floyd",
          "id": "1hqR9626rVPwkM5LkhwMdB"
        },
        {
          "name": "Free Bird",
          "id": "2GttMH50LmV8VtZaz4d1EL"
        },
        {
          "name": "Gimme Back My Bullets",
          "id": "2hc5Gh1hjeD9u9sePphc5c"
        },
        {
          "name": "Gimme Three Steps",
          "id": "2gb8P8RdKKi33qwQdoEDqz"
        },
        {
          "name": "God & Guns",
          "id": "1Yzi4gxDELjWljeiJWyMab"
        },
        {
          "name": "I Ain't The One",
          "id": "64D6ZWCJ6PzEhMdQlggfAX"
        },
        {
          "name": "I Ain’t the One (Live) - Live",
          "id": "00pIJgSV7P2d32pw2rhHKg"
        },
        {
          "name": "I Need You",
          "id": "6kPSNgbF8yHIozF1q4Z8X3"
        },
        {
          "name": "Last Of A Dyin' Breed",
          "id": "3FZ38op5Bz5FIB9cOIyDqo"
        },
        {
          "name": "Low Down Dirty",
          "id": "7Gutanf1Mf2r8ASTlrR5ku"
        },
        {
          "name": "Mississippi Kid",
          "id": "7frwBvUwRIWPPCbGUyNiz7"
        },
        {
          "name": "Mr. Banker - Demo Version",
          "id": "5HLauunWkzufh5hQM8Lv6m"
        },
        {
          "name": "Poison Whiskey",
          "id": "29EeOtew3YfzBGgvDkfamZ"
        },
        {
          "name": "Saturday Night Special",
          "id": "33o8XKWJMbMrfXz5TZYEgC"
        },
        {
          "name": "Simple Life",
          "id": "7aBClm8lSq91Ji8hQgIcQY"
        }
      ],
      "position": 94
    },
    {
      "name": "The Supremes",
      "id": "57bUPid8xztkieZfS7OlEV",
      "Musics": [
        {
          "name": "A Lover's Concerto - Stereo Version",
          "id": "1s1J0XvWdlCbs4VTQCg6Wm"
        },
        {
          "name": "Automatically Sunshine",
          "id": "1gINg89RTErjh05zXin1Fm"
        },
        {
          "name": "Baby Love",
          "id": "4YjR1uwtJGUs0sJiQIwcHZ"
        },
        {
          "name": "Back In My Arms Again - Mono Single Version",
          "id": "7vRGSGa0fmOUbSRaxPARVD"
        },
        {
          "name": "Can't Take My Eyes Off You",
          "id": "0DITVEgDPOBGDM35l8wTWx"
        },
        {
          "name": "Come See About Me - Stereo Version",
          "id": "22dLbMQkxE1cpDpu4VM3zc"
        },
        {
          "name": "Come Together",
          "id": "4Gqa83EZSU9kPgALVIat0x"
        },
        {
          "name": "Floy Joy",
          "id": "6XWOYZFBKrFd4s2WkIJ4O2"
        },
        {
          "name": "I Hear A Symphony - Mono Version",
          "id": "005X0FmdtkM1kiutosXLTR"
        },
        {
          "name": "I'm Gonna Make You Love Me",
          "id": "7v017KDoBLxFho1J6zqFyj"
        },
        {
          "name": "Let The Music Play",
          "id": "2Zb9AowisjU4NKptQpVpG4"
        },
        {
          "name": "Love Child",
          "id": "6R3fGF3etMJCT7D4wzwgD1"
        },
        {
          "name": "Love Is Like An Itching In My Heart",
          "id": "3CPO9kNxN6uxNq1PcOCSBn"
        },
        {
          "name": "Mr. Boogie",
          "id": "37UV3SEDx7kD7QlqPvirp4"
        },
        {
          "name": "My World Is Empty Without You - Stereo Version",
          "id": "6zUajAOIoY0Uw69xlxOUZy"
        },
        {
          "name": "Nathan Jones - Single Version",
          "id": "1SAQC4pqxPXoJNwOv6Sx8t"
        },
        {
          "name": "Reflections",
          "id": "6SxbPcftDHejqcCcyYq0hD"
        },
        {
          "name": "River Deep, Mountain High - Single Version (Mono)",
          "id": "2KKkcWrlHqrvQSeT7duWVe"
        },
        {
          "name": "Someday We'll Be Together",
          "id": "0fI6v4aWe5CE8geDcJhX5D"
        },
        {
          "name": "Stoned Love",
          "id": "3MEuq4es45tNFfxuK1Aknw"
        }
      ],
      "position": 95
    },
    {
      "name": "R.E.M.",
      "id": "4KWTAlx2RvbpseOGMEmROg",
      "Musics": [
        {
          "name": "All The Best",
          "id": "0DtD8Y4yVWRd8awoS9TeuK"
        },
        {
          "name": "All The Way To Reno (You're Gonna Be A Star)",
          "id": "6GuKEFrmycigOqJ7cUTeOr"
        },
        {
          "name": "Animal",
          "id": "7avubSyZrIXj7qvYfoXhpC"
        },
        {
          "name": "At My Most Beautiful",
          "id": "4NT9qBS4Tl4LFecdRV8nhe"
        },
        {
          "name": "Bad Day",
          "id": "3GqdTcvXQvqX0FljBh7eDP"
        },
        {
          "name": "Daysleeper",
          "id": "2S6rLct4sSrJcZpb5sZgAd"
        },
        {
          "name": "Discoverer",
          "id": "0CkWIdZXU9ps713BlociCz"
        },
        {
          "name": "Drive",
          "id": "1g1Qvn9GeCDkbuy71nRUzi"
        },
        {
          "name": "E-Bow The Letter",
          "id": "4nT18cJunvWCAgzD0mpPOt"
        },
        {
          "name": "Electrolite",
          "id": "39COi0iweaUiTLhA77qmWH"
        },
        {
          "name": "Electron Blue",
          "id": "0ywZAn3s7nisWNAPT94RAV"
        },
        {
          "name": "Everybody Hurts",
          "id": "5Q30xdABnojqN3wBIhrsQp"
        },
        {
          "name": "Fretless 1 - Demo",
          "id": "5tWfYaFyq5UbLe6h0FuH3n"
        },
        {
          "name": "Half A World Away",
          "id": "6FjC7DM65nvmQgbI0X14lW"
        },
        {
          "name": "Imitation Of Life",
          "id": "7KrTEmoOtwPix8vZpMnBQU"
        },
        {
          "name": "It Happened Today",
          "id": "7vyBJTjKDnlH9MGO8VZZZY"
        },
        {
          "name": "It's the End of the World As We Know It (And I Feel Fine)",
          "id": "2oSpQ7QtIKTNFfA08Cy0ku"
        },
        {
          "name": "Leaving New York",
          "id": "4XyZKIGpMOyAHuqdj3bRo5"
        },
        {
          "name": "Losing My Religion",
          "id": "12axV6NUqaYH3yFUWwArzr"
        },
        {
          "name": "Losing My Religion 2 - Demo",
          "id": "5nNJvaBZXOrn2ubRbS93JD"
        }
      ],
      "position": 96
    },
    {
      "name": "Curtis Mayfield ",
      "id": "2AV6XDIs32ofIJhkkDevjm",
      "Musics": [
        {
          "name": "(Don't Worry) If There Is A Hell Below, We're All Going To Go",
          "id": "5wdlG60d0WHoo8P3QzrlbG"
        },
        {
          "name": "Ain't Got Time",
          "id": "2cKcB4aKrMbxRN9aLLMTSv"
        },
        {
          "name": "Back To Living Again",
          "id": "47G06GEnF4Ujd1lYCs0Eqd"
        },
        {
          "name": "Back To The World",
          "id": "4FpUmXIiQdwILDH5Gwf90F"
        },
        {
          "name": "Beautiful Brother of Mine",
          "id": "73Tc8wtSLnQc72femcS9Wv"
        },
        {
          "name": "Future Shock",
          "id": "2sJ0dw9o8Cb4o5kpCLrxRj"
        },
        {
          "name": "Get Down",
          "id": "2QeAlLvGrBBiRLL8Ki3rfP"
        },
        {
          "name": "Ghetto Child - Demo Version",
          "id": "5oY6fpj8shlCCd92ShKe7l"
        },
        {
          "name": "Give It Up",
          "id": "1Py32yBkctRSakzbCebWeP"
        },
        {
          "name": "Here But I'm Gone",
          "id": "0zBNc7XcWXNHxeszwFsKiL"
        },
        {
          "name": "If I Were A Child Again",
          "id": "4vNUYq0hDbpxJwLfABrlPu"
        },
        {
          "name": "Just A Little Bit Of Love",
          "id": "1m0rLkQgaGGDTriUUg4jnq"
        },
        {
          "name": "Keep On Keeping On",
          "id": "1sgOdxA0PXortU0f2gA2jS"
        },
        {
          "name": "Kung Fu",
          "id": "5vM9tJqi8EA8iFdCCmz7HY"
        },
        {
          "name": "Make Me Believe In You",
          "id": "1yw66ZPsfqblI4PFcEdIKe"
        },
        {
          "name": "Miss Black America",
          "id": "4oBUytmHTeXPB7N9REJqeN"
        },
        {
          "name": "Move On Up",
          "id": "1DxjLSO8tQHRzfgrZB8Ggi"
        },
        {
          "name": "New World Order",
          "id": "3luduyy8gwkqMunb82OJZx"
        },
        {
          "name": "Power To The People - Demo Version",
          "id": "4rPiZiWUIZ9omo2MRbkHgn"
        },
        {
          "name": "Pusher Man",
          "id": "14Zdigity9O3iuDlKifcyr"
        }
      ],
      "position": 97
    },
    {
      "name": "Carl Perkins",
      "id": "5hIClg6noTaCzMu2s5wp4f",
      "Musics": [
        {
          "name": "Blue Suede Shoes",
          "id": "6TG4KnTHZMRvMPyZPJzxnh"
        },
        {
          "name": "Boppin' The Blues",
          "id": "0YmHUmDF5y9TQcnDxYdvpw"
        },
        {
          "name": "Brown Eyed Handsome Man",
          "id": "7qPzT2UcX3KMdxedXJvz9A"
        },
        {
          "name": "Caldonia",
          "id": "2ElzwKFiiXN0ZR1WoiDfNK"
        },
        {
          "name": "Dixie Fried",
          "id": "1B6Xr38bwl90VX4wTFQdYa"
        },
        {
          "name": "Everybody's Trying To Be My Baby",
          "id": "69ZSkezkt6RK15dGGMKOJy"
        },
        {
          "name": "Glad All Over",
          "id": "7zmQOuwLtQVu6CnDVOYXNu"
        },
        {
          "name": "Gone, Gone, Gone",
          "id": "5GxbUY95ye3OPh8YaULWMN"
        },
        {
          "name": "Honey Don't",
          "id": "3RThPzTuo3Y1HkQ6Gb0MVR"
        },
        {
          "name": "Honey, 'cause I Love You",
          "id": "4daLuRivT8Szfry5HW4sL2"
        },
        {
          "name": "I'm Sorry I'm Not Sorry",
          "id": "0xv45tlBUcGOP9tqV3ngnD"
        },
        {
          "name": "I'm Sorry, I'm Not Sorry",
          "id": "3oljISiyt66tSakAFws36r"
        },
        {
          "name": "In the Summertime / Suzie Q",
          "id": "1elVmyiGX9UeYjYUU1wDCZ"
        },
        {
          "name": "Let the Jukebox Keep Playing",
          "id": "7F1kARLkFqVoWYvJHf3yyQ"
        },
        {
          "name": "Matchbox",
          "id": "22NBZRa3jb8I6lkpg4XbqU"
        },
        {
          "name": "Movie Magg",
          "id": "0bCAvtOR9j3aFYyRheXKtr"
        },
        {
          "name": "Pink Pedal Pushers",
          "id": "3l9dRi6jKSgFyy9riVYelN"
        },
        {
          "name": "Pointed Toe Shoes",
          "id": "3nhe2L4I6917RrnUHJKMfo"
        },
        {
          "name": "Put Your Cat Clothes on",
          "id": "3UMUfq3IluAekN4FCZ1Ezp"
        },
        {
          "name": "Restless - Live",
          "id": "6hLJcvRh6QdkpVD34pApSn"
        }
      ],
      "position": 98
    },
    {
      "name": "Talking Heads",
      "id": "2x9SpqnPi8rlE9pjHBwmSC",
      "Musics": [
        {
          "name": "(Nothing But) Flowers",
          "id": "3tLolIaNbQSoIv6Usvhboh"
        },
        {
          "name": "And She Was - 2005 Remastered Version",
          "id": "5nNZTUzinBDsnj3U76NJFC"
        },
        {
          "name": "Blind",
          "id": "2PkLOjo2KmCCUQQI9XRe87"
        },
        {
          "name": "Born Under Punches (The Heat Goes On) - 2005 Remastered Version",
          "id": "4eBCTzBsSjYgrLH5clQf2x"
        },
        {
          "name": "Burning Down The House (45 Version)",
          "id": "2VNfJpwdEQBLyXajaa6LWT"
        },
        {
          "name": "Creatures Of Love - 2005 Remastered Version",
          "id": "3FaH21ikbgUKt21GMqC5DI"
        },
        {
          "name": "Crosseyed And Painless - 2005 Remastered Version",
          "id": "0yhwdmbgkKdE1plV8xWdrd"
        },
        {
          "name": "Don't Worry About The Government - 2005 Remastered Version",
          "id": "7zPfvP2sFsLxrKqezlvVm4"
        },
        {
          "name": "Dream Operator - 2005 Remastered Version",
          "id": "1eOcZTluAXwv5ZbvpEKnvy"
        },
        {
          "name": "Girlfriend Is Better - 2005 Remastered Version",
          "id": "6VyR9z26oKw6BvlwSjqvoY"
        },
        {
          "name": "Happy Day - 2005 Remastered Version",
          "id": "7ep7F087jSsCVNaeDyT1HB"
        },
        {
          "name": "Heaven - Live",
          "id": "0Q2b6AxWV5tD117XktdQxl"
        },
        {
          "name": "I Wish You Wouldn't Say That - 2005 Remastered Version",
          "id": "3wDryXAf7AdbqETul2bcX6"
        },
        {
          "name": "Life During Wartime - Live",
          "id": "0aRtXmOhG0zypXF6nkLi2r"
        },
        {
          "name": "Love -> Building On Fire",
          "id": "6hfsIlwOxJ0cX8v2SNntBQ"
        },
        {
          "name": "Love For Sale - 2005 Remastered Version",
          "id": "1RqNYDlHoHNdr3QGLtzKtb"
        },
        {
          "name": "New Feeling - 2005 Remastered Version",
          "id": "2pmytOddxLVaASHQqTH9LO"
        },
        {
          "name": "No Compassion - 2005 Remastered Version",
          "id": "6OnVsxDfoaJQhC3iyU15UN"
        },
        {
          "name": "Once In A Lifetime - 2005 Remastered Version",
          "id": "38Ngied9rBORlAbLYNCl4k"
        },
        {
          "name": "Perfect World - 2005 Remastered Version",
          "id": "6e7IrptCjEXaRcKrVaEgO1"
        }
      ],
      "position": 99
    }
  ];


// Requesting authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};


// Reading artistsTopTracks.json file
jsonfile.readFile(readJsonPath, function(err, data) {
  //console.log(data);
  //console.log(data.artistTopTracks);
  // Requesting an object to the Spotify Web API
  var tracksIds = "";
  // Getting 100 ids
  for (var i = position; i < position+4; i++) {
    console.log(data.artistTracks[i].name);
    for (var j = 0; j < data.artistTracks[i].Musics.length; j++) {
     tracksIds += data.artistTracks[i].Musics[j].id + ",";
    }
  }
  //console.log(tracksIds);

request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // Use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/audio-features/?ids=' + tracksIds,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log("body",body.audio_features.length);
        //console.log(typeof(body.audio_features[0]),body.audio_features[0].danceability);
        var k =0;
        inside_arquivo =[];
        for(var i =position;i<position+4;i++){
          var musics_features =[];
          var artista = artists[i];
          //console.log(artista);
          if(artists[i].name==="The Sex Pistols"){
            for(var j = 0;j<8;j++){
           // console.log("K ",body.audio_features[k])
            var artist_musics = body.audio_features[k];
            var music = { 
                name: artista.Musics[j].name,
                id:artista.Musics[j].id,
                danceability:artist_musics.danceability,
                energy: artist_musics.energy,
                key: artist_musics.key,
                loudness: artist_musics.loudness,
                mode: artist_musics.mode,
                speechiness:artist_musics.speechiness,
                acousticness:artist_musics.acousticness ,
                instrumentalness: artist_musics.instrumentalness,
                liveness:artist_musics.liveness,
                valence:artist_musics.valence,
                tempo:artist_musics.tempo ,
                duration_m:artist_musics.duration_m,
                time_signature: artist_musics.time_signature
            }
            musics_features.push(music);
            k = k+1;
          }}else if (artists[i].name==="Simon & Garfunkel"){
            for(var j = 0;j<19;j++){
           // console.log("K ",body.audio_features[k])
            var artist_musics = body.audio_features[k];
            var music = { 
                name: artista.Musics[j].name,
                id:artista.Musics[j].id,
                danceability:artist_musics.danceability,
                energy: artist_musics.energy,
                key: artist_musics.key,
                loudness: artist_musics.loudness,
                mode: artist_musics.mode,
                speechiness:artist_musics.speechiness,
                acousticness:artist_musics.acousticness ,
                instrumentalness: artist_musics.instrumentalness,
                liveness:artist_musics.liveness,
                valence:artist_musics.valence,
                tempo:artist_musics.tempo ,
                duration_m:artist_musics.duration_m,
                time_signature: artist_musics.time_signature
            }
            musics_features.push(music);
            k = k+1;
          }
        }else if(artists[i].name==="The Police"){
            for(var j = 0;j<17;j++){
           // console.log("K ",body.audio_features[k])
            var artist_musics = body.audio_features[k];
            var music = { 
                name: artista.Musics[j].name,
                id:artista.Musics[j].id,
                danceability:artist_musics.danceability,
                energy: artist_musics.energy,
                key: artist_musics.key,
                loudness: artist_musics.loudness,
                mode: artist_musics.mode,
                speechiness:artist_musics.speechiness,
                acousticness:artist_musics.acousticness ,
                instrumentalness: artist_musics.instrumentalness,
                liveness:artist_musics.liveness,
                valence:artist_musics.valence,
                tempo:artist_musics.tempo ,
                duration_m:artist_musics.duration_m,
                time_signature: artist_musics.time_signature
            }
            musics_features.push(music);
            k = k+1;
          }

        }else if(artists[i].name==="The Four Tops"){
            for(var j = 0;j<1;j++){
           // console.log("K ",body.audio_features[k])
            var artist_musics = body.audio_features[k];
            var music = { 
                name: artista.Musics[j].name,
                id:artista.Musics[j].id,
                danceability:artist_musics.danceability,
                energy: artist_musics.energy,
                key: artist_musics.key,
                loudness: artist_musics.loudness,
                mode: artist_musics.mode,
                speechiness:artist_musics.speechiness,
                acousticness:artist_musics.acousticness ,
                instrumentalness: artist_musics.instrumentalness,
                liveness:artist_musics.liveness,
                valence:artist_musics.valence,
                tempo:artist_musics.tempo ,
                duration_m:artist_musics.duration_m,
                time_signature: artist_musics.time_signature
            }
            musics_features.push(music);
            k = k+1;
          }

        }else{
          for(var j = 0;j<20;j++){
            var artist_musics = body.audio_features[k];
            // console.log(artista.Musics[j].name);
            //console.log(j,"Aqui",k);
            var music = { 
                name: artista.Musics[j].name,
                id:artista.Musics[j].id,
                danceability:artist_musics.danceability,
                energy: artist_musics.energy,
                key: artist_musics.key,
                loudness: artist_musics.loudness,
                mode: artist_musics.mode,
                speechiness:artist_musics.speechiness,
                acousticness:artist_musics.acousticness ,
                instrumentalness: artist_musics.instrumentalness,
                liveness:artist_musics.liveness,
                valence:artist_musics.valence,
                tempo:artist_musics.tempo ,
                duration_m:artist_musics.duration_m,
                time_signature: artist_musics.time_signature
            }
            musics_features.push(music);
            k = k+1;
          }
        }
          var obj = {
          name: artists[i].name,
          id: artists[i].id,
          musics: musics_features,
          position : artists[i].position
          }
          inside_arquivo.push(obj);
        }

        body = {
           artists_20_Songs : inside_arquivo
        }
        // Writting requested object to a JSON file
        jsonfile.writeFile(writeJsonPath, body, function(err) {
          console.error(err);
        });
      });
    }
  });  
});
       /* var inside_arquivo = [];
        var k =0;
        for (var i = 0; i < 2; i++) {
          console.log(body.audio_features[i]);
          var artist =data.artist20Tracks[i].name ;
          var musics_features = [];
          for(var j = k ;j<k+20;j++){
            var artist_musics = body.audio_features[j];
            var music = { 
                name: artist.Musics[j].name,
                id:artist.Musics[j].id,
                danceability:artist_musics.danceability,
                energy: artist_musics.energy,
                key: artist_musics.key,
                loudness: artist_musics.loudness,
                mode: artist_musics.mode,
                speechiness:artist_musics.speechiness,
                acousticness:artist_musics.acousticness ,
                instrumentalness: artist_musics.instrumentalness,
                liveness:artist_musics.liveness,
                valence:artist_musics.valence,
                tempo:artist_musics.tempo ,
                duration_m:artist_musics.duration_m,
                time_signature: artist_musics.time_signature

            }
            musics_features.push(music);
          }
          k = k+20;
        var obj = {
          name: data.artist20Tracks[i].name,
          id: data.artist20Tracks[i].id,
          musics: musics_features,
          position : data.artist20Tracks[i].position
        }
        inside_arquivo.push(obj);
      }

      var arquivo = { artist20Tracks : inside_arquivo};*/