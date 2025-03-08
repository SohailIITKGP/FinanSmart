import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { toast } from "sonner";
import moment from "moment";

function UpdateSpending({ budget, refreshData }) {
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onUpdateSpending = async () => {
    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: "Manual Spending Update",
          amount: Number(amount),
          budgetId: budget.id,
          createdAt: moment().format("DD/MM/yyy"),
        })
        .returning();

      if (result) {
        if (typeof refreshData === 'function') {
          await refreshData();
        }
        setAmount("");
        setIsOpen(false);
        toast("Spending Updated!");
      }
    } catch (error) {
      console.error("Error updating spending:", error);
      toast.error("Failed to update spending");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          Update Spending
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Spending for {budget.name}</DialogTitle>
          <DialogDescription>
            Add new spending amount to this budget. Current total spent: ${budget.totalSpend || 0}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5">
          <div className="mt-2">
            <h2 className="text-black font-medium my-1">Spending Amount</h2>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <Button
            disabled={!amount}
            onClick={onUpdateSpending}
            className="mt-5 w-full rounded-full"
          >
            Update Spending
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateSpending; 