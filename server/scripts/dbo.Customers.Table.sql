USE [arepasDB]
GO
/****** Object:  Table [dbo].[Customers]    Script Date: 13/11/2022 4:52:21 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[BirthOfDate] [date] NOT NULL,
	[RegisterDate] [date] NOT NULL,
	[Addres] [varchar](255) NOT NULL,
	[PhoneNumber] [varchar](50) NOT NULL,
	[Email] [varchar](255) NOT NULL,
	[Password] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Customers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
