import Link from "next/link";

export default function PayoutSection() {
  return (
    <main className="font-general-sans flex-1 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="border bg-gray-100 rounded-xl p-5 text-black relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <span className="text-sm text-black/80">Available Balance</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-full h-full opacity-80"
                  >
                    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                  </svg>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-300"></div>
                  <span className="text-[14px] font-medium text-black/90">
                    Active
                  </span>
                </div>
                <span className="text-[14px]">Virtual Card</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between items-end">
            <h2 className="text-[60px] font-medium">37.30dh</h2>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-mono tracking-wider text-lg">
              Marouane Boufarouj
            </p>

            <p className="text-sm text-black/80">Student ID: N15541245</p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-black/70 mb-1">Last Updated</p>
                <p>07/24</p>
              </div>
              <div className="text-right">
                <p className="text-black/70 mb-1">Class</p>
                <p>IID</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-transparent border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Today's Menu</p>
              <p className="text-2xl font-bold">8.50dh</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Monthly Spent</p>
              <p className="text-2xl font-bold">142.60dh</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link
            className="p-4 rounded-xl border text-center hover:bg-gray-50"
            href={"#"}
          >
            <button>
              <span className="block mb-1">📋</span>
              <span className="text-sm">View Menu</span>
            </button>
          </Link>

          <button className="p-4 rounded-xl border text-center hover:bg-gray-50">
            <span className="block mb-1">📊</span>
            <span className="text-sm">Statistics</span>
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Recent Transactions</h3>
          <div className="space-y-3">
            {[
              {
                title: "Lunch Menu",
                location: "Main Cafeteria",
                time: "Today, 12:36",
                amount: -8.5,
              },
              {
                title: "Breakfast",
                location: "Coffee Shop",
                time: "Today, 08:30",
                amount: -4.2,
              },
              {
                title: "Balance Added",
                location: "Online Top-up",
                time: "Yesterday",
                amount: 50,
              },
            ].map((tx, i) => (
              <div key={i} className="flex justify-between py-3 border-b">
                <div>
                  <p className="font-medium">{tx.title}</p>
                  <p className="text-sm text-gray-500">
                    {tx.location} • {tx.time}
                  </p>
                </div>
                <p className={tx.amount > 0 ? "text-green-500" : ""}>
                  {tx.amount > 0 ? "+" : ""}
                  {tx.amount}dh
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
