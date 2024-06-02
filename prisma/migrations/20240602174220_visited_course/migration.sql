-- CreateTable
CREATE TABLE "VisitedCourse" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "courseIds" TEXT NOT NULL DEFAULT '[]',

    CONSTRAINT "VisitedCourse_pkey" PRIMARY KEY ("id")
);
