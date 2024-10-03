import { Views } from "@/components/views";
import { Line } from "@/components/line";
import { Negative } from "@/components/BarNegative";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  return (
    <div
      class="dark"
      className="min-h-screen font-[family-name:var(--font-geist-sans)]"
    >
      <div
        id="banner"
        class="flex flex-row justify-between items-center top-0 h-16 p-4"
      >
        <h1 class="h1 text-white">School Achievement Hybrid Learning Model</h1>
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <Table>
            <TableCaption>Table to be filled with school stats</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-center">Index</TableHead>
                <TableHead className="text-center">School</TableHead>
                <TableHead className="text-center">Grade</TableHead>
                <TableHead className="text-center">Year</TableHead>
                <TableHead className="text-center">Archvz</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-center">1</TableCell>
                <TableCell className="text-center">Auburn</TableCell>
                <TableCell className="text-center">8</TableCell>
                <TableCell className="text-center">2023</TableCell>
                <TableCell className="text-center">0.5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-center">2</TableCell>
                <TableCell className="text-center">Opelika</TableCell>
                <TableCell className="text-center">9</TableCell>
                <TableCell className="text-center">2024</TableCell>
                <TableCell className="text-center">1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div>
          <div id="bargraph">
            <Views />
          </div>
          <div id="line">
            <Line />
          </div>
          <div id="negative">
            <Negative />
          </div>
        </div>
      </main>
    </div>
  );
}
