USE [arepasDB]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 13/11/2022 6:15:45 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CreateDate] [datetime] NOT NULL,
	[CustomerId] [int] NULL,
	[DeliveryFirstName] [varchar](50) NOT NULL,
	[DeliveryLastName] [varchar](50) NOT NULL,
	[DeliveryAddress] [varchar](255) NOT NULL,
	[DeliveryPhoneNombre] [varchar](50) NOT NULL,
	[Notes] [varchar](255) NULL,
	[TotalOrder] [decimal](18, 0) NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
