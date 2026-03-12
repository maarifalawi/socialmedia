import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { uatScenarios, documentInfo } from "@/data/uatData";

const UATReport = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const exportToExcel = () => {
    try {
      // Header rows
      const headerRows = [
        [documentInfo.title],
        [`${documentInfo.project} - Role: ${documentInfo.role}`],
        [`Versi: ${documentInfo.version}`],
        [`Tanggal: ${documentInfo.date}`],
        [`Total Skenario: ${documentInfo.totalScenarios}`],
        [], // Empty row
      ];

      // Table header
      const tableHeader = ["No.", "Halaman", "Skenario", "Hasil Yang Diharapkan", "Hasil", "TTD"];

      // Table data
      const tableData = uatScenarios.map((scenario) => [
        scenario.no,
        scenario.halaman,
        scenario.skenario,
        scenario.hasilDiharapkan,
        scenario.hasil,
        scenario.ttd,
      ]);

      // Combine all data
      const allData = [...headerRows, tableHeader, ...tableData];

      // Create worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(allData);

      // Set column widths
      worksheet["!cols"] = [
        { wch: 6 },   // No
        { wch: 18 },  // Halaman
        { wch: 55 },  // Skenario
        { wch: 50 },  // Hasil Diharapkan
        { wch: 12 },  // Hasil
        { wch: 10 },  // TTD
      ];

      // Merge header cells
      worksheet["!merges"] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }, // Title
        { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } }, // Project
        { s: { r: 2, c: 0 }, e: { r: 2, c: 5 } }, // Version
        { s: { r: 3, c: 0 }, e: { r: 3, c: 5 } }, // Date
        { s: { r: 4, c: 0 }, e: { r: 4, c: 5 } }, // Total
      ];

      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "UAT Pengguna");

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `UAT_Pengguna_SocialMediaAnalytics_${timestamp}.xlsx`;

      // Download file
      XLSX.writeFile(workbook, filename);

      toast({
        title: "Export Berhasil",
        description: `File ${filename} berhasil diunduh`,
      });
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast({
        title: "Export Gagal",
        description: "Terjadi kesalahan saat export ke Excel",
        variant: "destructive",
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header - Hide on print */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b print:hidden">
        <div className="container mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
          <div className="flex gap-2">
            <Button onClick={exportToExcel} className="gap-2" size="sm">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export Excel</span>
            </Button>
            <Button variant="outline" onClick={handlePrint} className="gap-2" size="sm">
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-20 pb-10 print:pt-0 print:px-0">
        {/* Document Header */}
        <div className="text-center mb-8 print:mb-4">
          <h1 className="text-2xl font-bold mb-2 print:text-xl">
            {documentInfo.title}
          </h1>
          <p className="text-lg text-muted-foreground print:text-base">
            {documentInfo.project}
          </p>
          <p className="text-muted-foreground">
            Role: {documentInfo.role}
          </p>
          <div className="mt-4 flex justify-center gap-8 text-sm text-muted-foreground print:gap-4">
            <span>Versi: {documentInfo.version}</span>
            <span>Tanggal: {documentInfo.date}</span>
            <span>Total: {documentInfo.totalScenarios} Skenario</span>
          </div>
        </div>

        {/* UAT Table */}
        <div className="border rounded-lg overflow-hidden print:border-black">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted print:bg-gray-200">
                <TableHead className="w-[60px] font-bold text-center print:border print:border-black">
                  No.
                </TableHead>
                <TableHead className="w-[150px] font-bold print:border print:border-black">
                  Halaman
                </TableHead>
                <TableHead className="font-bold print:border print:border-black">
                  Skenario
                </TableHead>
                <TableHead className="w-[300px] font-bold print:border print:border-black">
                  Hasil Yang Diharapkan
                </TableHead>
                <TableHead className="w-[100px] font-bold text-center print:border print:border-black">
                  Hasil
                </TableHead>
                <TableHead className="w-[80px] font-bold text-center print:border print:border-black">
                  TTD
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uatScenarios.map((scenario) => (
                <TableRow key={scenario.no} className="print:break-inside-avoid">
                  <TableCell className="text-center font-medium print:border print:border-black">
                    {scenario.no}
                  </TableCell>
                  <TableCell className="font-medium print:border print:border-black">
                    {scenario.halaman}
                  </TableCell>
                  <TableCell className="whitespace-pre-wrap print:border print:border-black">
                    {scenario.skenario}
                  </TableCell>
                  <TableCell className="print:border print:border-black">
                    {scenario.hasilDiharapkan}
                  </TableCell>
                  <TableCell className="print:border print:border-black">
                    {/* Empty for manual fill */}
                  </TableCell>
                  <TableCell className="print:border print:border-black">
                    {/* Empty for signature */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground print:mt-4">
          <p>Dokumen ini berisi {documentInfo.totalScenarios} skenario pengujian untuk role Pengguna.</p>
          <p className="mt-2">
            Status diisi dengan: <strong>PASS</strong> / <strong>FAIL</strong> / <strong>PENDING</strong>
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 10mm;
          }
          
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          table {
            font-size: 9px !important;
            width: 100% !important;
          }
          
          th, td {
            padding: 4px 6px !important;
          }
          
          tr {
            page-break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
};

export default UATReport;
