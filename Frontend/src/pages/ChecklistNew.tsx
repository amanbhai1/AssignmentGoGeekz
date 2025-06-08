import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Calendar,
  FileText,
  Download,
  Printer,
  Search,
  Filter,
  Target,
  Award,
  Upload,
} from "lucide-react";
import checklistService, { ChecklistItem } from "@/services/checklistService";

const ChecklistNew = () => {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fileId, setFileId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ChecklistItem | null>(null);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    dueDate: "",
    notes: "",
  });

  // Load checklist items on component mount
  useEffect(() => {
    loadChecklistItems();
  }, []);

  const loadChecklistItems = async () => {
    try {
      setLoading(true);
      const response = await checklistService.getChecklistItems();
      if (response.success) {
        setItems(response.checklist || []);
        setFileId(response.fileId);
      }
    } catch (error) {
      console.error("Error loading checklist items:", error);
      toast.error("Failed to load checklist items");
    } finally {
      setLoading(false);
    }
  };

  const toggleItemStatus = async (itemId: string, currentStatus: boolean) => {
    try {
      const response = await checklistService.toggleChecklistItem(
        fileId,
        itemId,
        !currentStatus
      );
      if (response.success) {
        setItems(response.checklist || []);
        toast.success(
          !currentStatus
            ? "Item marked as completed!"
            : "Item marked as pending"
        );
      }
    } catch (error) {
      console.error("Error toggling item status:", error);
      toast.error("Failed to update item status");
    }
  };

  const handleAddItem = async () => {
    if (!newItem.title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      const itemData = {
        ...newItem,
        dueDate: newItem.dueDate ? new Date(newItem.dueDate) : undefined,
      };
      
      const response = await checklistService.addChecklistItem(fileId, {
        ...itemData,
        dueDate: itemData.dueDate?.toISOString() || ''
      });
      if (response.success) {
        setItems(response.checklist || []);
        setIsAddDialogOpen(false);
        setNewItem({ title: "", description: "", dueDate: "", notes: "" });
        toast.success("Checklist item added successfully!");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Failed to add checklist item");
    }
  };

  const handleEditItem = async () => {
    if (!editingItem || !editingItem.title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      const response = await checklistService.updateChecklistItem(
        fileId,
        editingItem._id,
        {
          title: editingItem.title,
          description: editingItem.description,
          dueDate: editingItem.dueDate ? new Date(editingItem.dueDate).toISOString() : undefined,
          notes: editingItem.notes,
        }
      );
      if (response.success) {
        setItems(response.checklist || []);
        setIsEditDialogOpen(false);
        setEditingItem(null);
        toast.success("Checklist item updated successfully!");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update checklist item");
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      const response = await checklistService.deleteChecklistItem(fileId, itemId);
      if (response.success) {
        setItems(response.checklist || []);
        toast.success("Checklist item deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete checklist item");
    }
  };

  const getCompletionStats = () => {
    const completed = items.filter((item) => item.isCompleted).length;
    const total = items.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    return { completed, total, percentage };
  };

  const getStatusIcon = (isCompleted: boolean) => {
    return isCompleted ? (
      <CheckCircle className="h-5 w-5 text-green-600" />
    ) : (
      <Clock className="h-5 w-5 text-orange-600" />
    );
  };

  const getStatusBadge = (isCompleted: boolean) => {
    return isCompleted ? (
      <Badge className="bg-green-100 text-green-800 border-green-200">
        Completed
      </Badge>
    ) : (
      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
        Pending
      </Badge>
    );
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = getCompletionStats();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No due date";
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading checklist...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Immigration Checklist
            </h1>
            <p className="text-lg text-gray-600">
              Track your progress through the immigration process
            </p>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Checklist Item</DialogTitle>
                  <DialogDescription>
                    Create a new item to track in your immigration checklist.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={newItem.title}
                      onChange={(e) =>
                        setNewItem({ ...newItem, title: e.target.value })
                      }
                      placeholder="Enter item title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newItem.description}
                      onChange={(e) =>
                        setNewItem({ ...newItem, description: e.target.value })
                      }
                      placeholder="Enter item description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newItem.dueDate}
                      onChange={(e) =>
                        setNewItem({ ...newItem, dueDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newItem.notes}
                      onChange={(e) =>
                        setNewItem({ ...newItem, notes: e.target.value })
                      }
                      placeholder="Additional notes"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddItem}>Add Item</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-200 hover:bg-blue-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-green-200 hover:bg-green-50"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Overall Progress
                </h3>
                <p className="text-lg text-gray-600">
                  {stats.completed} of {stats.total} items completed
                </p>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {Math.round(stats.percentage)}%
                </div>
                <Progress
                  value={stats.percentage}
                  className="w-full lg:w-64 h-3 mb-2"
                />
                <div className="text-sm text-gray-600">Complete</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-green-200 bg-green-50">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {items.filter((i) => i.isCompleted).length}
                  </div>
                  <div className="text-sm font-medium text-green-700">
                    Completed
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-orange-200 bg-orange-50">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {items.filter((i) => !i.isCompleted).length}
                  </div>
                  <div className="text-sm font-medium text-orange-700">
                    Pending
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-blue-200 bg-blue-50">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {stats.total}
                  </div>
                  <div className="text-sm font-medium text-blue-700">
                    Total Items
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search checklist items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No checklist items found
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm
                    ? "No items match your search criteria."
                    : "Get started by adding your first checklist item."}
                </p>
                {!searchTerm && (
                  <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Item
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredItems.map((item) => (
              <Card
                key={item._id}
                className={`border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
                  item.isCompleted ? "bg-green-50/30" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={item.isCompleted}
                      onCheckedChange={() =>
                        toggleItemStatus(item._id, item.isCompleted)
                      }
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3
                            className={`text-lg font-semibold ${
                              item.isCompleted
                                ? "text-gray-500 line-through"
                                : "text-gray-900"
                            }`}
                          >
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-gray-600 mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(item.isCompleted)}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingItem({
                                ...item,
                                dueDate: item.dueDate
                                  ? new Date(item.dueDate)
                                      .toISOString()
                                      .split("T")[0]
                                  : "",
                              });
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteItem(item._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {formatDate(item.dueDate)}</span>
                        </div>
                        {getStatusIcon(item.isCompleted)}
                      </div>
                      {item.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{item.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Checklist Item</DialogTitle>
              <DialogDescription>
                Update the details of your checklist item.
              </DialogDescription>
            </DialogHeader>
            {editingItem && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Title *</Label>
                  <Input
                    id="edit-title"
                    value={editingItem.title}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, title: e.target.value })
                    }
                    placeholder="Enter item title"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingItem.description || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter item description"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-dueDate">Due Date</Label>
                  <Input
                    id="edit-dueDate"
                    type="date"
                    value={editingItem.dueDate || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        dueDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-notes">Notes</Label>
                  <Textarea
                    id="edit-notes"
                    value={editingItem.notes || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, notes: e.target.value })
                    }
                    placeholder="Additional notes"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditItem}>Update Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ChecklistNew;