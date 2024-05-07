/* eslint-disable @typescript-eslint/no-misused-promises */

import { auth, signIn } from "@/auth";
import { StickyHeader } from "@/components/layout/sticky-header";
import { redirect } from "next/navigation";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardFooter, Card } from "@/components/ui/card";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <StickyHeader className="px-4 py-2">
        <SignIn />
      </StickyHeader>
      <header className="bg-gray-900 text-white py-4 px-6 md:px-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link className="text-2xl font-bold" href="#">
            Cozy Coworking
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link className="hover:text-gray-400" href="#">
              Find Spaces
            </Link>
            <Link className="hover:text-gray-400" href="#">
              List Your Space
            </Link>
            <Link className="hover:text-gray-400" href="#">
              About
            </Link>
            <Link className="hover:text-gray-400" href="#">
              Contact
            </Link>
          </nav>
          <Button className="md:hidden" size="sm" variant="outline">
            Menu
          </Button>
        </div>
      </header>
      <section className="bg-gray-900 text-white py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Work with Your Friends in Style
            </h1>
            <p className="text-lg mb-8">
              Discover and book the perfect cozy coworking space for you and
              your team.
            </p>
            <form className="flex items-center bg-white rounded-md overflow-hidden">
              <Input
                className="flex-1 px-4 py-3 text-gray-700 focus:outline-none"
                placeholder="Search by location or amenities"
                type="text"
              />
              <Button
                className="bg-gray-900 text-white px-6 py-3"
                type="submit"
              >
                Find Spaces
              </Button>
            </form>
          </div>
          <div className="hidden md:block">
            <img
              alt="Coworking Space"
              className="rounded-lg"
              height={400}
              src="/placeholder.svg"
              style={{
                aspectRatio: "600/400",
                objectFit: "cover",
              }}
              width={600}
            />
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-12 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            Cozy Coworking Spaces for You and Your Friends
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <Card>
              <img
                alt="Coworking Space"
                className="rounded-t-lg object-cover"
                height={300}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover",
                }}
                width={400}
              />
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">The Cozy Nook</h3>
                <p className="text-gray-600 mb-2">123 Main St, Cozy Town USA</p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 font-bold">$79/month</p>
                  <Badge variant="success">Available</Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button size="sm">Book Now</Button>
              </CardFooter>
            </Card>
            <Card>
              <img
                alt="Coworking Space"
                className="rounded-t-lg object-cover"
                height={300}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover",
                }}
                width={400}
              />
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">Comfy Collective</h3>
                <p className="text-gray-600 mb-2">456 Oak Rd, Cozy City</p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 font-bold">$99/month</p>
                  <Badge variant="warning">Limited Availability</Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button size="sm">Book Now</Button>
              </CardFooter>
            </Card>
            <Card>
              <img
                alt="Coworking Space"
                className="rounded-t-lg object-cover"
                height={300}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover",
                }}
                width={400}
              />
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">Cozy Cubby</h3>
                <p className="text-gray-600 mb-2">789 Elm St, Cozy Town</p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 font-bold">$59/month</p>
                  <Badge variant="danger">Fully Booked</Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button size="sm">Book Now</Button>
              </CardFooter>
            </Card>
            <Card>
              <img
                alt="Coworking Space"
                className="rounded-t-lg object-cover"
                height={300}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover",
                }}
                width={400}
              />
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">Cozy Collective</h3>
                <p className="text-gray-600 mb-2">321 Pine St, Cozy Town</p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 font-bold">$89/month</p>
                  <Badge variant="success">Available</Badge>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button size="sm">Book Now</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

// export default function Home() {
//   return (
//     <>
//       <StickyHeader className="px-4 py-2">
//         <div className="flex justify-between items-center">
//           Convex + Next.js + Auth.js
//           <SignIn />
//         </div>
//       </StickyHeader>
//       <main className="container max-w-2xl flex flex-col gap-8">
//         <h1 className="text-4xl font-extrabold my-8 text-center">
//           Convex + Next.js + Auth.js
//         </h1>
//         <p>Here is where your marketing message goes.</p>
//         <p>The user doesn&apos;t need to log in to see it.</p>
//         <p>To interact with the app log in via the button up top.</p>
//       </main>
//     </>
//   );
// }

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";

        // Skip sign-in screen if the user is already signed in
        if ((await auth()) !== null) {
          redirect("/loggedin");
        }

        await signIn(undefined, { redirectTo: "/loggedin" });
      }}
    >
      <Button type="submit">Sign in</Button>
    </form>
  );
}
